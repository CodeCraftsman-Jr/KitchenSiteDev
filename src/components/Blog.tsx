import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import AppwriteImage from "@/components/AppwriteImage";

const Blog = () => {
  const { toast } = useToast();
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handleReadMore = (post: any) => {
    setSelectedPost(post);
  };

  const handleViewAllPosts = () => {
    setShowAllBlogs(true);
    toast({
      title: "Showing All Blogs",
      description: "Displaying all available blog posts",
    });
  };

  const handleShowLess = () => {
    setShowAllBlogs(false);
  };
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: api.getBlogs
  });

  const displayedPosts = showAllBlogs ? blogPosts : blogPosts.slice(0, 6);

  // Full blog post view
  if (selectedPost) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedPost(null)}
            className="mb-6"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Blog
          </Button>

          <article className="bg-white rounded-lg shadow-card p-8">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {selectedPost.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {selectedPost.content}
              </p>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            From Our Kitchen Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stories, recipes, and insights from our culinary journey. Stay updated with the latest from Vasanth's Kitchen.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayedPosts.map((post) => (
              <Card key={post.$id} className="shadow-card hover:shadow-warm transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-gradient-food relative overflow-hidden">
                  <AppwriteImage
                    fileId={post.image_file_id}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-primary">
                      {post.author || "Admin"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-warm-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                    onClick={() => handleReadMore(post)}
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          {!showAllBlogs ? (
            <Button variant="hero" onClick={handleViewAllPosts}>
              View More Blogs ({blogPosts.length - 6} more)
            </Button>
          ) : (
            <Button variant="outline" onClick={handleShowLess}>
              Show Less
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;