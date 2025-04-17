"use client";

import React, { useState, useEffect } from "react";

const PwaPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(false); // Default to light mode
    }
  }, []);

  useEffect(() => {
    // Save the theme preference to localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");

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
          Progressive Web App
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          A Progressive Web App (PWA) is delivered through the web. It is built using standard web technologies such as HTML, CSS, and JavaScript, but with the ability to deliver native-like experiences on the web.
        </p>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4">
            <img
            src="https://img.shields.io/badge/https://seo--inspect.vercel.app/-manifest.json-darkgreen"
            alt="PWA Manifest Badge"
            className="my-4"
          /> 
          </h2>

 
        <div className="relative mb-4">
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            {`{
  "short_name": "seo inspect",
  "name": "seo inspect",
  "start_url": "https://seo-inspect.vercel.app",
  "icons": [
    {
      "src": "https://seo-inspect.vercel.app/icon-192.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "any maskable"
    },
    {
      "src": "https://seo-inspect.vercel.app/icon-512.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#000",
  "background_color": "#f0f0f0"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-4">
          Service Worker Integration
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          To enable offline capabilities, you need to register a <code className="text-green-800">service-worker.js</code> file in your application.
        </p>
        <div className="relative mb-4">
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            {`if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function (registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function (error) {
        console.log('Service Worker registration failed:', error);
      });
  });
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PwaPage;


