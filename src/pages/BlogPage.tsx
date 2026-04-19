import Header from "@/components/Header";
import Blog from "@/components/Blog";
import SEO from "@/components/SEO";
import JSONLD from "@/components/JSONLD";
import { getCanonicalUrl } from "@/lib/seo";
import { useEffect } from "react";

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative font-sans text-foreground bg-background">
      <SEO
        title="Kitchen Blog, Recipes and Food Stories"
        description="Read updates, recipes, and food stories from Vasanth's Kitchen. Discover local flavors, kitchen tips, and new menu highlights."
        path="/blog"
      />
      <JSONLD
        id="blogposting"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: "Vasanth's Kitchen Blog",
          description: 'Food stories, kitchen updates, and culinary insights from Vasanth\'s Kitchen.',
          mainEntityOfPage: getCanonicalUrl('/blog'),
          publisher: {
            '@type': 'Organization',
            name: "Vasanth's Kitchen",
          },
          author: {
            '@type': 'Organization',
            name: "Vasanth's Kitchen",
          },
          datePublished: '2026-01-01',
          dateModified: '2026-01-01',
        }}
      />
      <Header />
      <div className="pt-8">
        <Blog />
      </div>
    </div>
  );
};

export default BlogPage;
