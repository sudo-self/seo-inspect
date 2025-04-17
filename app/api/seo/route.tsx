import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface Folder {
  name: string;
  type: "file" | "directory";
  children?: Folder[];
}

function buildFolderTree(paths: string[]): Folder[] {
  const root: Record<string, any> = {};

  for (const path of paths) {
    const parts = path.replace(/^\/+/, "").split("/");
    let current = root;

    parts.forEach((part, i) => {
      if (!current[part]) {
        current[part] = {
          __meta: {
            name: part,
            type: i === parts.length - 1 ? "file" : "directory",
            children: {},
          },
        };
      }
      current = current[part].__meta.children;
    });
  }

  const convert = (node: any): Folder[] =>
    Object.values(node).map((entry: any) => ({
      name: entry.__meta.name,
      type: entry.__meta.type,
      children:
        entry.__meta.type === "directory"
          ? convert(entry.__meta.children)
          : undefined,
    }));

  return convert(root);
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract favicon
    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "/favicon.ico";
    const faviconUrl = new URL(favicon, url).href;

    // Extract meta tags
    const metaTags = $('meta')
      .map((_, el) => {
        const name = $(el).attr("name");
        const property = $(el).attr("property");
        const content = $(el).attr("content");
        if (name || property) {
          return { name, property, content };
        }
        return null;
      })
      .get()
      .filter(Boolean);

    // Extract author
    const author =
      $('meta[name="author"]').attr("content") ||
      $('meta[property="og:author"]').attr("content") ||
      null;

    // Extract manifest (if available)
    const manifestHref = $('link[rel="manifest"]').attr("href");
    let manifest = null;
    if (manifestHref) {
      const manifestUrl = new URL(manifestHref, url).href;
      try {
        const manifestRes = await fetch(manifestUrl);
        if (manifestRes.ok) {
          manifest = await manifestRes.json();
        }
      } catch (err) {
        console.warn("Failed to fetch manifest:", err);
      }
    }

    // 🔍 Extract static assets from HTML
    const assetPaths = new Set<string>();

    $('link[href]').each((_, el) => {
      const href = $(el).attr("href");
      if (href && !href.startsWith("http")) {
        try {
          const parsed = new URL(href, url);
          assetPaths.add(parsed.pathname);
        } catch {}
      }
    });

    $('script[src]').each((_, el) => {
      const src = $(el).attr("src");
      if (src && !src.startsWith("http")) {
        try {
          const parsed = new URL(src, url);
          assetPaths.add(parsed.pathname);
        } catch {}
      }
    });

    $('img[src]').each((_, el) => {
      const src = $(el).attr("src");
      if (src && !src.startsWith("http")) {
        try {
          const parsed = new URL(src, url);
          assetPaths.add(parsed.pathname);
        } catch {}
      }
    });

    // Include known resources
    try {
      const f = new URL(favicon, url);
      assetPaths.add(f.pathname);
    } catch {}

    if (manifestHref) {
      try {
        const m = new URL(manifestHref, url);
        assetPaths.add(m.pathname);
      } catch {}
    }

    const folderTree = buildFolderTree([...assetPaths]);

    return NextResponse.json({
      favicon: faviconUrl,
      metaTags,
      manifest,
      author,
      folderTree,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
