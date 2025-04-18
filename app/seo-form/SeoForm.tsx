'use client';

import { useState } from 'react';
import SeoMeta from './SeoMeta';
import { Copy } from 'lucide-react';

const defaultPlaceholders = {
  title: 'SEO Inspect',
  description: 'Generate SEO for your project',
  url: 'https://seo-inspect.vercel.app',
  image: 'https://seo-inspect.vercel.app',
  author: 'developer',
  keywords: 'seo, web, meta tags',
  robots: 'index, follow',
  canonical: 'https://seo-inspect.vercel.app',
  favicon: '/favicon.ico',
  appleTouchIcon: '/apple-touch-icon.png',
};

export default function SeoForm() {
  const [meta, setMeta] = useState(
    Object.fromEntries(
      Object.keys(defaultPlaceholders).map((key) => [key, ''])
    ) as typeof defaultPlaceholders
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const jsxOutput = `<SeoMeta
  title="${meta.title || defaultPlaceholders.title}"
  description="${meta.description || defaultPlaceholders.description}"
  url="${meta.url || defaultPlaceholders.url}"
  image="${meta.image || defaultPlaceholders.image}"
  author="${meta.author || defaultPlaceholders.author}"
  keywords="${meta.keywords || defaultPlaceholders.keywords}"
  robots="${meta.robots || defaultPlaceholders.robots}"
  canonical="${meta.canonical || defaultPlaceholders.canonical}"
  favicon="${meta.favicon || defaultPlaceholders.favicon}"
  appleTouchIcon="${meta.appleTouchIcon || defaultPlaceholders.appleTouchIcon}"
/>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsxOutput);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <SeoMeta {...meta} />

      <div className="max-w-xl mx-auto p-4 space-y-4">
        {Object.entries(defaultPlaceholders).map(([key, placeholder]) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize mb-1 text-gray-700 dark:text-gray-300">
              {key}
            </label>
            <input
              type="text"
              name={key}
              placeholder={placeholder}
              value={meta[key as keyof typeof meta]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
          </div>
        ))}
      </div>
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <img
                src="https://img.shields.io/badge/PREVIEW-gray"
                alt="Favicon Badge"
                className="w-auto h-5"
              />
            </h2>
          </div>


      {/* Google Search Result Preview */}
      <div className="max-w-xl mx-auto mt-8 p-4 bg-gray-100 dark:bg-gray-900 shadow-md rounded-md">
        <div className="flex flex-col space-y-2">
          <a
            href={meta.url || defaultPlaceholders.url}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 font-semibold text-lg"
          >
            {meta.title || defaultPlaceholders.title}
          </a>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {meta.description || defaultPlaceholders.description}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {meta.url || defaultPlaceholders.url}
          </div>
        </div>
      </div>
         

      {/* Output JSX for copying */}
      <div className="max-w-2xl mx-auto mt-8 bg-zinc-900 text-green-400 font-mono p-4 rounded-md relative overflow-x-auto">
        <pre className="whitespace-pre-wrap">{jsxOutput}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 text-sm rounded flex items-center gap-1"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
      </div>
    </>
  );
}

