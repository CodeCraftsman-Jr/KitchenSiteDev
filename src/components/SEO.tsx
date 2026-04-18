import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, getCanonicalUrl } from "@/lib/seo";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

const setOrCreateMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
    document.head.appendChild(element);
    return;
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const setOrCreateLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    Object.entries(attrs).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
    document.head.appendChild(element);
    return;
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const SEO = ({ title, description, path, image = DEFAULT_OG_IMAGE, noIndex = false }: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonical = getCanonicalUrl(path);
    const ogImage = image.startsWith("http") ? image : getCanonicalUrl(image);

    document.title = fullTitle;

    setOrCreateMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    setOrCreateMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });

    setOrCreateMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    setOrCreateMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });

    setOrCreateMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonical,
    });

    setOrCreateMeta('meta[property="og:image"]', {
      property: "og:image",
      content: ogImage,
    });

    setOrCreateMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });

    setOrCreateMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });

    setOrCreateMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    setOrCreateMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: ogImage,
    });

    setOrCreateMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });

    setOrCreateLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonical,
    });
  }, [title, description, path, image, noIndex]);

  return null;
};

export default SEO;
