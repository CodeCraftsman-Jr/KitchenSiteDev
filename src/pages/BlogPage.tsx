import Header from "@/components/Header";
import Blog from "@/components/Blog";
import SEO from "@/components/SEO";
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
      <Header />
      <div className="pt-8">
        <Blog />
      </div>
    </div>
  );
};

export default BlogPage;
