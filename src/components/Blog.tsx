import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Secret Behind Perfect Biryani: Our Traditional Recipe",
      excerpt: "Discover the centuries-old techniques and premium ingredients that make our biryani extraordinary. From selecting the finest basmati rice to our signature spice blend...",
      category: "Recipes",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Farm to Kitchen: Our Sustainable Sourcing Journey",
      excerpt: "Learn about our commitment to sustainability and how we partner with local farmers to bring you the freshest ingredients while supporting our community...",
      category: "Sustainability",
      date: "March 10, 2024",
      readTime: "3 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Health Benefits of Indian Spices: Beyond Flavor",
      excerpt: "Explore the incredible health benefits of traditional Indian spices used in our dishes. From turmeric's anti-inflammatory properties to cumin's digestive benefits...",
      category: "Health & Wellness",
      date: "March 5, 2024",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Behind the Scenes: A Day in Our Cloud Kitchen",
      excerpt: "Take an exclusive look at our state-of-the-art cloud kitchen facilities, meet our passionate chefs, and see how we maintain the highest standards of hygiene and quality...",
      category: "Behind the Scenes",
      date: "February 28, 2024",
      readTime: "6 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Celebrating Festivals: Special Menu Planning",
      excerpt: "Discover how we create special festival menus that honor traditional celebrations while adding our own modern twist. From Diwali sweets to Holi specials...",
      category: "Culture",
      date: "February 20, 2024",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Customer Stories: Memorable Food Experiences",
      excerpt: "Read heartwarming stories from our customers about how our food has been part of their special moments, celebrations, and daily comfort meals...",
      category: "Customer Stories",
      date: "February 15, 2024",
      readTime: "3 min read",
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            From Our Kitchen Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stories, recipes, and insights from our culinary journey. Stay updated with the latest from Spice Kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="shadow-card hover:shadow-warm transition-all duration-300 group overflow-hidden">
              <div className="aspect-video bg-gradient-food relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {post.category}
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
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero">
            View All Blog Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;