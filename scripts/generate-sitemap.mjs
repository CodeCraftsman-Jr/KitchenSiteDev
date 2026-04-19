import fs from 'node:fs';
import path from 'node:path';

const siteUrl = (process.env.VITE_SITE_URL || 'https://vasanthskitchen.com').replace(/\/$/, '');

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/menu', changefreq: 'daily', priority: '0.95' },
  { path: '/book-table', changefreq: 'daily', priority: '0.9' },
  { path: '/about', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.85' },
  { path: '/contact', changefreq: 'weekly', priority: '0.8' },
];

const urlEntries = staticRoutes
  .map((route) => {
    return [
      '  <url>',
      `    <loc>${siteUrl}${route.path}</loc>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlEntries,
  '</urlset>',
].join('\n');

const targetPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(targetPath, `${sitemap}\n`, 'utf-8');

console.log(`Sitemap generated at ${targetPath}`);
