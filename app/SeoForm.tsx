'use client';

import { useState } from 'react';
import SeoMeta from './SeoMeta';
import { Copy } from 'lucide-react'; // Requires lucide-react

export default function SeoForm() {
  const [meta, setMeta] = useState({
    title: 'AwesomeProject',
    description: 'create seo for your project',
    url: 'https://example.com',
    image: 'https://example.com/linkpreview.png',
    author: 'Mr. Awesome',
    keywords: 'seo, web, meta tags',
    robots: 'index, follow',
    canonical: 'https://example.com',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const jsxOutput = `<SeoMeta
  title="${meta.title}"
  description="${meta.description}"
  url="${meta.url}"
  image="${meta.image}"
  author="${meta.author}"
  keywords="${meta.keywords}"
  robots="${meta.robots}"
  canonical="${meta.canonical}"
  favicon="${meta.favicon}"
  appleTouchIcon="${meta.appleTouchIcon}"
/>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsxOutput);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <SeoMeta {...meta} />

      <div className="max-w-xl mx-auto p-4 space-y-4">
        {Object.entries(meta).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        ))}
      </div>

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
