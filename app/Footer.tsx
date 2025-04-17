"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-6 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="text-sm sm:text-base">
          <a
            href="https://seo-inspect.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-400 to-gray-800 font-semibold hover:underline"
          >
            seo.inspect
          </a>
        </span>
        <div className="text-xs sm:text-sm text-black mt-3 flex items-center justify-center">
          <span>Powered by </span>
          <img
            src="./next.svg"
            alt="NextJS Logo"
            className="h-6 w-auto mx-2"
          />
          <span>/api/route.tsx</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





