"use client";

import React, { useState, useEffect } from "react";

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className="bg-gray-100 dark:bg-gray-900 container mx-auto p-8 max-w-4xl min-h-screen pb-20 pt-24">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          SEO Inspector API
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          The SEO Inspector API allows you to analyze the SEO elements of a given website.
          It checks essential elements such as the favicon, meta tags, author, manifest,
          and the file structure of the website to ensure it is optimized for search engines.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4">
          API Syntax
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          You can interact with the API by sending a <code className="text-indigo-500">POST</code> request to the endpoint.
          The body of the request must contain a valid <strong>URL</strong> for the website you wish to analyze.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-4">
          Request Format
        </h3>
        <pre className="bg-gray-800 text-white p-4 rounded mb-4">
          {`POST /api/seo-check

Request body:
{
  "url": "https://seo-inspect.vercel.app"
}`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-4">
          Response Format
        </h3>
        <pre className="bg-gray-800 text-white p-4 rounded mb-4">
          {`Response:
{
  "favicon": "https://seo-inspect.vercel.app/favicon.ico",
  "metaTags": [
    { "name": "description", "content": "SEO Inspector Tool" },
    { "property": "og:title", "content": "SEO Inspector" }
  ],
  "author": "John Doe",
  "manifest": { "name": "SEO App", "start_url": "/index.html" },
  "folderTree": [
    { "name": "assets", "type": "directory", "children": [...] }
  ]
}`}
        </pre>

        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4">
          Key Features of the API
        </h2>
        <ul className="list-disc pl-6">
          <li className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            <strong>Favicon:</strong> Extracts the favicon URL from the provided website.
          </li>
          <li className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            <strong>Meta Tags:</strong> Extracts and returns meta tags like description, author, and Open Graph tags.
          </li>
          <li className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            <strong>Manifest File:</strong> If available, fetches the website's manifest file.
          </li>
          <li className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            <strong>Static Assets:</strong> Scans the website for static assets (such as images, scripts, and stylesheets) and builds a folder structure for the resources.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4">
          Example Usage
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          To use the API, you can send a <code className="text-indigo-500">POST</code> request to the endpoint with the URL of the website you want to analyze. For example, to analyze <strong>https://seo-inspect.vercel.app</strong>, send the following request:
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded mb-4">
          {`curl -X POST http://seo-inspect.vercel.app/api/seo-check -H "Content-Type: application/json" -d '{"url": "https://seo-inspect.vercel.app"}'`}
        </pre>
        
      </div>

    </div>
  );
};

export default About;



