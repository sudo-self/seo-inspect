//app/page.tsx

"use client";

import React, { useState, useEffect } from "react";




// SEO data interfaces
interface MetaTag {
  name?: string;
  property?: string;
  content?: string;
}

interface SEOData {
  favicon: string | null;
  metaTags: MetaTag[];
  manifest: Record<string, any> | null;
  author: string | null;
  error: string | null;
  loading: boolean;
}

interface Folder {
  name: string;
  type: "file" | "directory";
  children?: Folder[];
}

// Helpers
const normalizeUrl = (url: string) => {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const SEOChecker = () => {
  const [url, setUrl] = useState("");
  const [seoData, setSeoData] = useState<SEOData>({
    favicon: null,
    metaTags: [],
    manifest: null,
    author: null,
    error: null,
    loading: false,
  });

  const [folderTree, setFolderTree] = useState<Folder[]>([]);
  const [showHtmlManifest, setShowHtmlManifest] = useState(false);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) =>
            console.log("Service Worker registered:", registration)
          )
          .catch((error) =>
            console.error("Service Worker registration failed:", error)
          );
      });
    }
  }, []);

  const fetchData = async (targetUrl: string) => {
    try {
      setSeoData((prev) => ({ ...prev, loading: true, error: null }));

      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSeoData({
        favicon: data.favicon || null,
        metaTags: data.metaTags || [],
        manifest: data.manifest || null,
        author: data.author || null,
        error: null,
        loading: false,
      });

      setFolderTree(data.folderTree || []);
    } catch (error: any) {
      setSeoData((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) fetchData(normalizeUrl(url));
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setUrl(text);
    });
  };

  const renderFolderTree = (folders: Folder[], depth = 0): JSX.Element[] =>
    folders.map((folder, index) => (
      <div key={`${depth}-${index}`} className={`pl-${depth * 4}`}>
        <div className="text-sm font-mono text-gray-800 dark:text-gray-200">
          {folder.type === "directory" ? "📁" : "📄"} {folder.name}
        </div>
        {folder.type === "directory" && folder.children?.length
          ? renderFolderTree(folder.children, depth + 1)
          : null}
      </div>
    ));

  return (
    <div className="bg-gray-100 dark:bg-gray-900 container mx-auto p-8 max-w-4xl min-h-screen pb-20 pt-24">
      {/* Header */}
          <div className="text-center max-w-2xl mx-auto mt-12 px-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
              seo-inspect.vercel.app
            </h1>
            <p className="text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 mb-4">
              Generate SEO components and inspect websites by URL — including meta tags, Open Graph data, and static assets.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Note:</strong> This site does not collect or store any data from the URLs you enter.
            </p>
          </div>


      {/* URL Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <input
            type="url"
            placeholder="Enter the website URL"
            className="flex-grow border rounded px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handlePaste}
            className="bg-blue-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded"
          >
            Paste
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
            disabled={seoData.loading}
          >
            {seoData.loading ? "Checking..." : "Check"}
          </button>
        </div>
      </form>

      {/* Website Iframe */}
      {url && (
        <div className="mb-6">
          <iframe
            src={normalizeUrl(url)}
            title="Website Preview"
            width="100%"
            height="400"
            className="border border-gray-300 dark:border-gray-600 rounded"
            loading="lazy"
          />
        </div>
      )}

      {/* Favicon */}
      {seoData.favicon && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <img
              src="https://img.shields.io/badge/favicon-gray"
              alt="Favicon Badge"
              className="w-auto h-5"
            />
          </h2>

          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow-sm border dark:border-gray-700">
            <img
              src={seoData.favicon}
              alt="Site Favicon"
              className="w-10 h-10 rounded"
              onError={(e) =>
                ((e.target as HTMLImageElement).style.display = "none")
              }
              title="Site Favicon"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 break-all">
              {seoData.favicon}
            </span>
          </div>
        </div>
      )}

      {/* Author */}
      {seoData.author && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <img
              src="https://img.shields.io/badge/Author-gray"
              alt="Favicon Badge"
              className="w-auto h-5"
            />
          </h2>
          <div className="text-sm text-blue-700 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700">
            {seoData.author}
          </div>
        </div>
      )}

      {/* Error Message */}
      {seoData.error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>{" "}
          <span>{seoData.error}</span>
        </div>
      )}

      {/* Meta Tags */}
      {seoData.metaTags.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {seoData.metaTags.map((tag, index) => (
              <div
                key={index}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                {tag.name && (
                  <div>
                    <strong className="text-blue-500">Name:</strong>{" "}
                    {tag.name}
                  </div>
                )}
                {tag.property && (
                  <div>
                    <strong className="text-green-800">Property:</strong>{" "}
                    {tag.property}
                  </div>
                )}
                {tag.content && (
                  <div className="truncate max-w-full overflow-hidden text-ellipsis">
                    <strong>Content:</strong> {tag.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manifest */}
      {seoData.manifest && (
        <div className="mb-4">
          <button
            onClick={() => setShowHtmlManifest(!showHtmlManifest)}
            className="mb-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded text-sm"
          >
            {showHtmlManifest ? "Hide" : "Show"} manifest
          </button>
          {showHtmlManifest && (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm text-gray-700 dark:text-gray-200">
              {JSON.stringify(seoData.manifest, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* Folder Tree & Terminal View */}
      {folderTree.length > 0 && (
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2">
              <strong>/PUBLIC</strong>
            </h2>
            {renderFolderTree(folderTree)}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <img
                src="https://img.shields.io/badge/SEO-JSON-darkgreen"
                alt="Badge Preview"
              />
            </h2>
            <div className="bg-black text-gray-400 font-mono p-4 rounded-lg overflow-auto text-sm max-h-[500px] shadow-inner shadow-black border border-gray-700">
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(seoData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
          
       
    </div>
  );
};

export default SEOChecker;





