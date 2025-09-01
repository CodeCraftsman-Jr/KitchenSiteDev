import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Utensils,
  Smartphone,
  Truck,
  Award,
  Target,
  Rocket
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FuturePlans = () => {
  const { toast } = useToast();

  const handleSubscribeUpdates = () => {
    // Open community link
    const communityLink = "https://t.me/vasanthskitchencommunity";
    window.open(communityLink, '_blank');

    toast({
      title: "Join Our Community",
      description: "Opening Telegram community for updates and discussions...",
    });
  };

  const handleCareerOpportunities = () => {
    toast({
      title: "Career Opportunities",
      description: "Will be hiring soon! Stay tuned for exciting opportunities.",
      duration: 4000
    });
  };
  const expansionPlans = [
    {
      title: "Coimbatore Expansion",
      description: "Opening cloud kitchen in Coimbatore focusing on student areas and residential zones",
      timeline: "2025",
      status: "Planning",
      icon: MapPin,
      color: "text-green-600"
    },
    {
      title: "Chennai Launch",
      description: "Strategic entry into Chennai market with focus on student communities and working professionals",
      timeline: "2027",
      status: "Future Planning",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Villupuram Launch",
      description: "Expanding to Villupuram to serve the local community with authentic home-style food",
      timeline: "2026",
      status: "Research",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  const techInnovations = [
    {
      title: "AI-Powered Recommendations",
      description: "Smart menu suggestions based on customer preferences and order history",
      timeline: "May 2024",
      status: "Development",
      icon: Smartphone,
      color: "text-indigo-600"
    },
    {
      title: "Live Kitchen Streaming",
      description: "Real-time kitchen webcams for complete transparency in food preparation",
      timeline: "July 2024",
      status: "Planning",
      icon: Users,
      color: "text-red-600"
    },
    {
      title: "Drone Delivery Pilot",
      description: "Testing drone delivery for orders within 3km radius in select areas",
      timeline: "Q4 2024",
      status: "Research",
      icon: Truck,
      color: "text-green-500"
    }
  ];

  const menuInnovations = [
    {
      title: "Regional Cuisines",
      description: "Adding Bengali, Gujarati, and Punjabi specialties to our menu",
      timeline: "August 2024",
      status: "Recipe Testing",
      icon: Utensils,
      color: "text-orange-600"
    },
    {
      title: "Healthy Options",
      description: "Introducing a complete range of keto, vegan, and low-calorie options",
      timeline: "June 2024",
      status: "Development",
      icon: Award,
      color: "text-emerald-600"
    },
    {
      title: "Fusion Experiments",
      description: "Indo-Chinese, Indo-Italian fusion dishes for the adventurous palate",
      timeline: "October 2024",
      status: "Conceptual",
      icon: Rocket,
      color: "text-pink-600"
    }
  ];

  const milestones = [
    { year: "2024", target: "Reached over 10,000+ customers", description: "Growing customer base in Pondicherry" },
    { year: "2025", target: "Increase menu items", description: "Expanding variety of home-style dishes" },
    { year: "2026", target: "2nd branch in White Town", description: "Opening second location by end of 2026" },
    { year: "2027", target: "Chennai branch", description: "Major city expansion to serve more students" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-green-100 text-green-800";
      case "Development": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-orange-100 text-orange-800";
      case "Research": return "bg-purple-100 text-purple-800";
      case "Recipe Testing": return "bg-yellow-100 text-yellow-800";
      case "Conceptual": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="future-plans" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Future Vision
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exciting plans ahead! We're constantly innovating to serve you better with new locations, 
            technology, and culinary experiences.
          </p>
        </div>

        {/* Expansion Plans */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Expansion Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expansionPlans.map((plan, index) => (
              <Card key={index} className="shadow-card hover:shadow-warm transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-warm flex items-center justify-center ${plan.color}`}>
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-primary mb-2">{plan.title}</h4>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">Expected: {plan.timeline}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Innovations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Technology Innovations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techInnovations.map((tech, index) => (
              <Card key={index} className="shadow-card hover:shadow-warm transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-warm flex items-center justify-center ${tech.color}`}>
                      <tech.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-primary mb-2">{tech.title}</h4>
                      <Badge className={getStatusColor(tech.status)}>
                        {tech.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{tech.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">Target: {tech.timeline}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>



        {/* Milestones Timeline */}
        <div className="bg-background rounded-2xl p-8 shadow-card">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Growth Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{milestone.year}</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">{milestone.target}</h4>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <h4 className="text-xl font-bold text-primary mb-4">Join Our Journey</h4>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of our growth story! Join our community for the latest updates on new locations,
              menu additions, and exciting developments. Connect with fellow food lovers and get exclusive updates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" onClick={handleSubscribeUpdates}>
                Join Community
              </Button>
              <Button variant="outline" onClick={handleCareerOpportunities}>
                Will be hiring soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturePlans;