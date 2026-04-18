export const SITE_NAME = "Vasanth's Kitchen";

const siteUrlFromEnv = import.meta.env.VITE_SITE_URL;

export const SITE_URL = siteUrlFromEnv && siteUrlFromEnv.trim().length > 0
  ? siteUrlFromEnv.replace(/\/$/, "")
  : "https://vasanthskitchen.com";

export const DEFAULT_OG_IMAGE = "/images/restaurant-hero.jpg";

export const getCanonicalUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
