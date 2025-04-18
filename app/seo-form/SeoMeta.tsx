// app/SeoMeta.tsx
'use client';

import Head from 'next/head';

type SeoMetaProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
  favicon?: string;
  appleTouchIcon?: string;
};

export default function SeoMeta({
  title,
  description,
  url,
  image,
  author,
  keywords = '',
  robots = 'index, follow',
  canonical,
  favicon = '/favicon.ico',
  appleTouchIcon = '/apple-touch-icon.png',
}: SeoMetaProps) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content={author} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Icons */}
      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href={appleTouchIcon} />
    </Head>
  );
}
