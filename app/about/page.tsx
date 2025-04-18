"use client";

import React, { useState, useEffect } from "react";

const About = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [seoData, setSeoData] = useState<any>(null);
  const [url, setUrl] = useState("https://example.com"); // Example URL
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      // Default to light mode
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    // Save the theme preference to localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    // Apply the dark class to the body when dark mode is enabled
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch SEO data when the URL is changed
  useEffect(() => {
    const fetchSeoData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/seo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        const data = await response.json();
        setSeoData(data);
      } catch (error) {
        console.error("Failed to fetch SEO data", error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchSeoData();
    }
  }, [url]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 container mx-auto p-8 max-w-4xl min-h-screen pb-20 pt-24">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          API
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          You can interact with the API by sending a{" "}
          <code className="text-indigo-500">POST</code> request to the endpoint.
          The body of the request must contain a valid <strong>URL</strong> for
          the website you wish to analyze.
        </p>

        {/* Display the API Endpoint */}
        <div className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          <strong>
          
          <img
          src="https://img.shields.io/badge/API-ENDPOINT-blue"
          alt="PWA Manifest Badge"
          className="my-4"
        />
          
          </strong>{" "}
          <span className="text-indigo-500">https://seo-inspect.vercel.app/api/seo</span>
        </div>

          {/* Input field to set URL */}
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white mb-6"
            placeholder="Enter a website URL"
          />


        {loading ? (
          <div className="text-lg text-gray-700 dark:text-gray-300">
            Loading SEO data...
          </div>
        ) : seoData ? (
          <>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-4">
                       <img
                       src="https://img.shields.io/badge/POST-blue"
                       alt="PWA Manifest Badge"
                       className="my-4"
                     />
            </h3>
            <pre className="bg-gray-800 text-white p-4 rounded mb-6">
              {`POST /api/seo/

const res = await fetch("/api/seo", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "${url}" }),
});
`}
            </pre>

            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-4">
                       <img
                       src="https://img.shields.io/badge/JSON-darkgreen"
                       alt="PWA Manifest Badge"
                       className="my-4"
                     />
            </h3>
            <pre className="bg-gray-800 text-white p-4 rounded mb-6">
              {`Response:
{
  "favicon": "${seoData.favicon}",
  "metaTags": ${JSON.stringify(seoData.metaTags, null, 2)},
  "author": "${seoData.author}",
  "manifest": ${JSON.stringify(seoData.manifest, null, 2)},
  "folderTree": ${JSON.stringify(seoData.folderTree, null, 2)}
}`}
            </pre>

            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4">
              Key Features of the API
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                <strong>Favicon:</strong> Extracts the favicon URL from the provided website.
              </li>
              <li className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                <strong>Meta Tags:</strong> Extracts and returns meta tags like description, author, and Open Graph tags.
              </li>
              <li className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                <strong>Manifest File:</strong> If available, fetches the website's manifest file.
              </li>
              <li className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                <strong>Static Assets:</strong> Scans the website for static assets (such as images, scripts, and stylesheets) and builds a folder structure for the resources.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4">
              Example Usage
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              To use the API, you can send a{" "}
              <code className="text-indigo-500">POST</code> request to the endpoint with the URL of the website you want to analyze. For example, to analyze{" "}
              <strong>https://example.com</strong>, send the following request:
            </p>
            
            <div className="overflow-auto mb-6">
              <pre className="bg-gray-800 text-white p-4 rounded">
                {`curl -X POST https://seo-inspect.vercel.app/api/seo -H "Content-Type: application/json" -d '{"url": "${url}"}'`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-4">
              Example Response
            </h3>
            <pre className="bg-gray-800 text-white p-4 rounded mb-6">
              {`Response:
{
  "favicon": "https://example.com/favicon.ico",
  "metaTags": [
    {
      "name": "viewport",
      "content": "width=device-width, initial-scale=1"
    }
  ],
  "manifest": null,
  "author": null,
  "folderTree": [
    {
      "name": "favicon.ico",
      "type": "file"
    }
  ]
}`}
            </pre>
          </>
        ) : (
          <div className="text-lg text-gray-700 dark:text-gray-300">No data available</div>
        )}
      </div>
    </div>
  );
};

export default About;
