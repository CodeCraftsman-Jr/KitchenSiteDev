import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Perfect South Indian Dosa Making",
      excerpt: "Discover the secrets behind our crispy, golden dosas. From fermentation techniques to achieving the perfect batter consistency...",
      content: "Making the perfect dosa is an art that requires patience, skill, and the right techniques. At Vasanth's Kitchen, we follow traditional methods passed down through generations. Our batter is made from a perfect blend of rice and urad dal, fermented for exactly 8-12 hours to achieve the ideal sourness and texture. The key to a crispy dosa lies in the temperature of the tawa and the way you spread the batter. We use a special technique that ensures each dosa is paper-thin yet doesn't break. Our chutneys are made fresh daily using coconut, mint, and tomatoes sourced from local farmers.",
      category: "Recipes",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Student-Friendly Healthy Meals: Our Mission",
      excerpt: "Learn about our commitment to providing nutritious, affordable meals for students in Pondicherry. How we balance taste, health, and budget...",
      content: "As a 19-year-old student entrepreneur, I understand the challenges students face when it comes to finding healthy, affordable meals. That's why Vasanth's Kitchen was founded with students in mind. We focus on providing home-style South Indian food that's not only delicious but also nutritious and budget-friendly. Our meals are designed to give students the energy they need for their studies while reminding them of home. We use minimal oil, fresh vegetables, and traditional cooking methods that preserve the nutritional value of ingredients.",
      category: "Health & Wellness",
      date: "March 10, 2024",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "From College Dorm to Cloud Kitchen: My Journey",
      excerpt: "The inspiring story of how a 19-year-old student started Vasanth's Kitchen during college days to solve food problems faced by students...",
      content: "My journey started in my college dorm room when I realized how difficult it was for students to find good, affordable, home-style food. Being away from home, I missed my mother's cooking and noticed that many of my fellow students felt the same way. That's when I decided to start Vasanth's Kitchen. With the support of my parents - my father Elumalai, who works at Pondicherry University, and my mother Abirami - I was able to turn this dream into reality. Starting a business while studying was challenging, but the positive response from students motivated me to continue.",
      category: "Entrepreneur Story",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Traditional Idli: The Perfect Breakfast Choice",
      excerpt: "Why idli remains the healthiest breakfast option and how we prepare our soft, fluffy idlis using traditional steaming methods...",
      content: "Idli is often called the perfect breakfast food, and for good reason. It's light, easily digestible, and packed with nutrients from fermented rice and lentils. At Vasanth's Kitchen, we prepare our idlis using the traditional steaming method that preserves all the nutritional benefits. Our batter is fermented naturally, which increases the bioavailability of nutrients and makes it easier to digest. We serve our idlis with fresh sambar made from toor dal and seasonal vegetables, along with coconut and tomato chutneys prepared daily.",
      category: "Health & Wellness",
      date: "February 28, 2024",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Supporting Local Farmers: Our Ingredient Sourcing",
      excerpt: "How Vasanth's Kitchen supports local farmers in Pondicherry by sourcing fresh vegetables, rice, and spices directly from them...",
      content: "We believe in supporting our local community, which is why we source most of our ingredients directly from farmers in and around Pondicherry. This not only ensures the freshness of our ingredients but also helps local farmers get fair prices for their produce. Our rice comes from local paddy fields, our vegetables are picked fresh from nearby farms, and our spices are sourced from traditional spice gardens. This farm-to-kitchen approach allows us to maintain quality while keeping our prices affordable for students.",
      category: "Sustainability",
      date: "February 20, 2024",
      readTime: "3 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "The Science Behind Fermentation in South Indian Cuisine",
      excerpt: "Understanding the fermentation process that makes South Indian foods like idli, dosa, and uttapam not just tasty but also highly nutritious...",
      content: "Fermentation is the heart of South Indian cuisine, and it's what makes our food so special. When we ferment rice and lentil batter, beneficial bacteria break down complex carbohydrates and proteins, making them easier to digest. This process also increases the vitamin B12 content and adds probiotics that are great for gut health. At Vasanth's Kitchen, we maintain the perfect temperature and humidity conditions for fermentation, ensuring that our batters develop the right flavor and texture every time.",
      category: "Health & Wellness",
      date: "February 15, 2024",
      readTime: "5 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 7,
      title: "Expansion Plans: Bringing Home Food to More Cities",
      excerpt: "Our vision to expand Vasanth's Kitchen to Coimbatore, Chennai, and Villupuram, bringing authentic home-style food to students across Tamil Nadu...",
      content: "Our dream doesn't stop with Pondicherry. We have ambitious plans to expand Vasanth's Kitchen to other cities where students need access to healthy, affordable, home-style food. Our next targets are Coimbatore, Chennai, and Villupuram. Each location will maintain the same commitment to quality and affordability that we've established here in Pondicherry. We're also planning to open our second branch in White Town, Pondicherry by the end of 2026.",
      category: "Business",
      date: "February 10, 2024",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 8,
      title: "Customer Stories: How Our Food Brings Comfort",
      excerpt: "Heartwarming stories from students and customers about how Vasanth's Kitchen food reminds them of home and provides comfort during tough times...",
      content: "Nothing makes us happier than hearing from our customers about how our food has made a difference in their lives. From homesick students who find comfort in our home-style cooking to busy professionals who rely on our healthy meals, every story motivates us to do better. One student wrote to us saying our curd rice reminded her of her grandmother's cooking, while another mentioned how our fresh idlis gave him energy for his exams. These stories are the reason we do what we do.",
      category: "Customer Stories",
      date: "February 5, 2024",
      readTime: "3 min read",
      image: "/api/placeholder/400/250"
    }
  ];

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
                  <span>{selectedPost.readTime}</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedPosts.map((post) => (
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