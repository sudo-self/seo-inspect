"use client";

import React, { useState, useEffect } from "react";

//SEO data
interface MetaTag {
  name?: string;
  property?: string;
  content?: string;
}

interface SEOData {
  favicon: string | null;
  metaTags: MetaTag[];
  manifest: any | null;
  author: string | null;
  error: string | null;
  loading: boolean;
}

interface Folder {
  name: string;
  type: "file" | "directory";
  children?: Folder[];
}

const htmlEntities = (str: string) =>
  str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

const normalizeUrl = (url: string) => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
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

  //service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration);
          })
          .catch((error) => {
            console.log("Service Worker registration failed:", error);
          });
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

  const renderFolderTree = (folders: Folder[], depth = 0): JSX.Element[] =>
    folders.map((folder, index) => (
      <div key={`${depth}-${index}`} className={`pl-${depth * 4}`}>
        <div className="text-sm font-mono text-gray-800 dark:text-gray-200">
          {folder.type === "directory" ? "📁" : "📄"} {folder.name}
        </div>
        {folder.children &&
          folder.type === "directory" &&
          renderFolderTree(folder.children, depth + 1)}
      </div>
    ));

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setUrl(text);
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 container mx-auto p-8 max-w-4xl min-h-screen pb-20 pt-24">
      {/* Section Above the Input Area */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          seo-inspect.vercel.app
        </h1>
        <p className="text-lg text-indigo-600 dark:text-gray-300 mb-4">
          View SEO components including seoData, metaTags, and static assets.
          <span className="block text-sm text-gray-500 dark:text-gray-400 mt-2">
            **Note: This site does not collect or store any data from the URLs you enter.
          </span>
        </p>
      </div>

      {/* URL Input Form */}
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

      {/* URL Iframe Display */}
      {url && (
        <div className="mb-6">
          <iframe
            src={normalizeUrl(url)}
            title="Website Preview"
            width="100%"
            height="400px"
            className="border border-gray-300 dark:border-gray-600 rounded"
            loading="lazy"
          ></iframe>
        </div>
      )}

      {/* Favicon Display */}
      {seoData.favicon && (
        <div className="mt-4 flex items-center gap-2">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2 flex items-center">
            <img
              src="https://img.shields.io/badge/favicon.ico-violet"
              alt="Status Badge"
              className="ml-2"
            />
          </h2>
          <div className="flex items-center gap-2">
            <img
              src={seoData.favicon}
              alt="Site Favicon"
              className="w-10 h-10 rounded"
              onError={(e) =>
                ((e.target as HTMLImageElement).style.display = "none")
              }
              title="Site Favicon"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {seoData.favicon}
            </span>
          </div>
        </div>
      )}

      {/* Author Display */}
      {seoData.author && (
        <div className="mt-2 text-sm text-blue-700 dark:text-gray-400">
          <span className="font-medium">Author:</span> {seoData.author}
        </div>
      )}

      {/* Error Display */}
      {seoData.error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span>{seoData.error}</span>
        </div>
      )}

      {/* Meta Tags Display */}
      {seoData.metaTags.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2 flex items-center">
            <img
              src="https://img.shields.io/badge/open-graph-blue"
              alt="Status Badge"
              className="ml-2"
            />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {seoData.metaTags.map((tag, index) => (
              <div
                key={index}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                {tag.name && (
                  <div>
                    <strong className="text-blue-500">Name:</strong> {tag.name}
                  </div>
                )}
                {tag.property && (
                  <div>
                    <strong className="text-green-800">Property:</strong> {tag.property}
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

      {/* Manifest Display */}
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

      {/* Folder Tree */}
      {folderTree.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2">
            Folder Structure
          </h2>
          {renderFolderTree(folderTree)}
        </div>
      )}

      {/* Full SEO JSON Output */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2">
          <img src="https://img.shields.io/badge/SEO-inspect-pink" alt="Badge Preview" />
        </h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm text-gray-700 dark:text-gray-200 max-h-[500px]">
          {JSON.stringify(seoData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default SEOChecker;

