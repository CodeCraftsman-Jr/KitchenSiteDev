import fs from 'node:fs';
import path from 'node:path';
import { Client, Databases, Query, TablesDB } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const siteUrl = (process.env.VITE_SITE_URL || 'https://vasanthskitchen.com').replace(/\/$/, '');
const appwriteEndpoint = process.env.VITE_APPWRITE_ENDPOINT || 'https://varsys.co.in/v1';
const appwriteProjectId = process.env.VITE_APPWRITE_PROJECT_ID || '69e0a488000bb42b2af2';
const appwriteDatabaseId = process.env.VITE_APPWRITE_DATABASE_ID || 'kitchen_site_db';
const appwriteApiKey = process.env.APPWRITE_API_KEY;
const appwriteDataSource = (process.env.APPWRITE_DATA_SOURCE || 'auto').toLowerCase();
const appwritePublicFallback = process.env.APPWRITE_SITEMAP_PUBLIC_FALLBACK === 'true';

const COLLECTIONS = {
  BLOGS: process.env.APPWRITE_BLOGS_COLLECTION_ID || 'blogs',
  MENU_CATEGORIES: process.env.APPWRITE_MENU_CATEGORIES_COLLECTION_ID || 'menu_categories',
  MENU_ITEMS: process.env.APPWRITE_MENU_ITEMS_COLLECTION_ID || 'menu_items',
};

const slugify = (value = '') => {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const createAppwriteClients = () => {
  const client = new Client()
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectId);

  if (appwriteApiKey) {
    client.setKey(appwriteApiKey);
  }

  return {
    databases: new Databases(client),
    tablesDB: new TablesDB(client),
  };
};

const listAllDocumentsFromDatabases = async (databases, collectionId) => {
  const all = [];
  let cursor = null;

  while (true) {
    const queries = [Query.limit(100)];
    if (cursor) {
      queries.push(Query.cursorAfter(cursor));
    }

    const response = await databases.listDocuments({
      databaseId: appwriteDatabaseId,
      collectionId,
      queries,
    });
    const docs = response.documents || [];
    all.push(...docs);

    if (docs.length < 100) {
      break;
    }

    cursor = docs[docs.length - 1].$id;
  }

  return all;
};

const listAllRowsFromTablesDB = async (tablesDB, tableId) => {
  const all = [];
  let cursor = null;

  while (true) {
    const queries = [Query.limit(100)];
    if (cursor) {
      queries.push(Query.cursorAfter(cursor));
    }

    const response = await tablesDB.listRows({
      databaseId: appwriteDatabaseId,
      tableId,
      queries,
    });

    const rows = response.rows || [];
    all.push(...rows);

    if (rows.length < 100) {
      break;
    }

    cursor = rows[rows.length - 1].$id;
  }

  return all;
};

const listAllContent = async (clients, resourceId) => {
  if (appwriteDataSource === 'tablesdb') {
    return listAllRowsFromTablesDB(clients.tablesDB, resourceId);
  }

  if (appwriteDataSource === 'databases') {
    return listAllDocumentsFromDatabases(clients.databases, resourceId);
  }

  try {
    return await listAllRowsFromTablesDB(clients.tablesDB, resourceId);
  } catch {
    return listAllDocumentsFromDatabases(clients.databases, resourceId);
  }
};

const listAllDocumentsPublic = async (collectionId) => {
  const all = [];
  let offset = 0;

  while (true) {
    const url = new URL(`${appwriteEndpoint}/databases/${appwriteDatabaseId}/collections/${collectionId}/documents`);
    url.searchParams.append('queries[]', Query.limit(100));
    url.searchParams.append('queries[]', Query.offset(offset));

    const response = await fetch(url, {
      headers: {
        'X-Appwrite-Project': appwriteProjectId,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Public fetch failed for ${collectionId}: ${response.status}`);
    }

    const data = await response.json();
    const docs = data.documents || [];
    all.push(...docs);

    if (docs.length < 100) break;
    offset += 100;
  }

  return all;
};

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/menu', changefreq: 'daily', priority: '0.95' },
  { path: '/book-table', changefreq: 'daily', priority: '0.9' },
  { path: '/about', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.85' },
  { path: '/contact', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', changefreq: 'weekly', priority: '0.7' },
  { path: '/privacy-policy', changefreq: 'monthly', priority: '0.4' },
  { path: '/terms', changefreq: 'monthly', priority: '0.4' },
  { path: '/refund-policy', changefreq: 'monthly', priority: '0.4' },
  { path: '/shipping-delivery', changefreq: 'monthly', priority: '0.4' },
];

const dynamicRoutes = [];

try {
  const clients = createAppwriteClients();

  const [blogs, categories, menuItems] = await Promise.all([
    listAllContent(clients, COLLECTIONS.BLOGS),
    listAllContent(clients, COLLECTIONS.MENU_CATEGORIES),
    listAllContent(clients, COLLECTIONS.MENU_ITEMS),
  ]);

  blogs.forEach((post) => {
    const slug = post.slug || slugify(post.title);
    if (slug) {
      dynamicRoutes.push({ path: `/blog/${slug}`, changefreq: 'weekly', priority: '0.7' });
    }
  });

  const categorySlugMap = new Map();
  categories.forEach((category) => {
    const categorySlug = category.slug || slugify(category.name);
    if (!categorySlug) return;

    categorySlugMap.set(category.$id, categorySlug);
    dynamicRoutes.push({ path: `/menu/${categorySlug}`, changefreq: 'daily', priority: '0.85' });
  });

  menuItems.forEach((item) => {
    const categorySlug = categorySlugMap.get(item.category_id);
    const itemSlug = item.slug || slugify(item.name);

    if (categorySlug && itemSlug) {
      dynamicRoutes.push({ path: `/menu/${categorySlug}/${itemSlug}`, changefreq: 'weekly', priority: '0.6' });
    }
  });
} catch (error) {
  console.warn('Could not fetch dynamic routes from Appwrite. Generating sitemap with static routes only.');
  if (error instanceof Error) {
    console.warn(`Appwrite dynamic fetch error: ${error.message}`);
  }
  if (!appwriteApiKey) {
    console.warn('APPWRITE_API_KEY is missing for sitemap script.');
  }

  if (appwritePublicFallback) {
    try {
      const [blogs, categories, menuItems] = await Promise.all([
        listAllDocumentsPublic(COLLECTIONS.BLOGS),
        listAllDocumentsPublic(COLLECTIONS.MENU_CATEGORIES),
        listAllDocumentsPublic(COLLECTIONS.MENU_ITEMS),
      ]);

      blogs.forEach((post) => {
        const slug = post.slug || slugify(post.title);
        if (slug) dynamicRoutes.push({ path: `/blog/${slug}`, changefreq: 'weekly', priority: '0.7' });
      });

      const categorySlugMap = new Map();
      categories.forEach((category) => {
        const categorySlug = category.slug || slugify(category.name);
        if (!categorySlug) return;
        categorySlugMap.set(category.$id, categorySlug);
        dynamicRoutes.push({ path: `/menu/${categorySlug}`, changefreq: 'daily', priority: '0.85' });
      });

      menuItems.forEach((item) => {
        const categorySlug = categorySlugMap.get(item.category_id);
        const itemSlug = item.slug || slugify(item.name);
        if (categorySlug && itemSlug) {
          dynamicRoutes.push({ path: `/menu/${categorySlug}/${itemSlug}`, changefreq: 'weekly', priority: '0.6' });
        }
      });

      console.log('Dynamic routes loaded via public Appwrite fallback.');
    } catch (fallbackError) {
      if (fallbackError instanceof Error) {
        console.warn(`Public fallback also failed: ${fallbackError.message}`);
      }
    }
  }
}

const uniqueRoutes = Array.from(
  new Map([...staticRoutes, ...dynamicRoutes].map((route) => [route.path, route])).values()
);

const urlEntries = uniqueRoutes
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
