import Blog from "@/components/Blog";
import Header from "@/components/Header";
import JSONLD from "@/components/JSONLD";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { api, getImageUrl } from "@/services/api";
import AppwriteImage from "@/components/AppwriteImage";
import { slugify } from "@/lib/slug";
import { getCanonicalUrl } from "@/lib/seo";

type BlogPost = {
  $id: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  date?: string;
  image_file_id?: string;
  slug?: string;
};

const BlogPostPage = () => {
  const { slug = "" } = useParams();

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blogs"],
    queryFn: api.getBlogs,
  });

  const post = posts.find((item) => (item.slug || slugify(item.title)) === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Blog Post Not Found"
          description="The blog post you are looking for is not available."
          path={`/blog/${slug}`}
          noIndex
        />
        <Header />
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-primary">Post not found</h1>
          <p className="mt-3 text-muted-foreground">This article may have been moved or removed.</p>
          <Button className="mt-6" asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const canonicalPath = `/blog/${post.slug || slugify(post.title)}`;
  const postImageUrl = post.image_file_id ? getImageUrl(post.image_file_id) : undefined;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEO
        title={post.title}
        description={post.excerpt || post.content?.slice(0, 155) || "Kitchen blog update from Vasanth's Kitchen."}
        path={canonicalPath}
      />
      <JSONLD
        id={`blog-post-${post.$id}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt || post.content || '',
          image: postImageUrl ? [postImageUrl] : [],
          datePublished: post.date || '2026-01-01',
          dateModified: post.date || '2026-01-01',
          author: {
            '@type': 'Organization',
            name: post.author || "Vasanth's Kitchen",
          },
          publisher: {
            '@type': 'Organization',
            name: "Vasanth's Kitchen",
          },
          mainEntityOfPage: getCanonicalUrl(canonicalPath),
        }}
      />
      <Header />

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/blog">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Blog
          </Link>
        </Button>

        <Card className="overflow-hidden shadow-card">
          <div className="relative aspect-video">
            <AppwriteImage
              fileId={post.image_file_id}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <CardContent className="p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{post.author || 'Admin'}</Badge>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {post.date || 'Recent update'}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-primary md:text-4xl">{post.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">{post.excerpt}</p>
            <div className="prose prose-lg max-w-none text-foreground">
              <p>{post.content || 'Content coming soon.'}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default BlogPostPage;
