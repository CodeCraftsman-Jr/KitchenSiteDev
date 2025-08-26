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
    toast({
      title: "Subscribe to Updates",
      description: "Redirecting to subscription form...",
    });
    // In a real app, this would open a subscription form
  };

  const handleCareerOpportunities = () => {
    toast({
      title: "Career Opportunities",
      description: "Redirecting to careers page...",
    });
    // In a real app, this would redirect to a careers page
  };
  const expansionPlans = [
    {
      title: "New Branch - Thane",
      description: "Opening our fourth branch in Thane West with expanded seating and dine-in facilities",
      timeline: "April 2024",
      status: "In Progress",
      icon: MapPin,
      color: "text-green-600"
    },
    {
      title: "Pune Expansion",
      description: "Expanding to Pune with two cloud kitchens in Koregaon Park and Hinjewadi",
      timeline: "June 2024",
      status: "Planning",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Delhi NCR Launch",
      description: "Major expansion to Delhi NCR with 5 strategic locations across Gurgaon and Noida",
      timeline: "September 2024",
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
    { year: "2024", target: "50,000+ Monthly Orders", description: "Expanding customer base across Puducherry" },
    { year: "2025", target: "10 City Presence", description: "Nationwide expansion with 25+ kitchens" },
    { year: "2026", target: "₹100 Cr Revenue", description: "Achieving significant market presence" },
    { year: "2027", target: "International Launch", description: "Expanding to Dubai and Singapore" }
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

        {/* Menu Innovations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Menu Innovations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuInnovations.map((menu, index) => (
              <Card key={index} className="shadow-card hover:shadow-warm transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-warm flex items-center justify-center ${menu.color}`}>
                      <menu.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-primary mb-2">{menu.title}</h4>
                      <Badge className={getStatusColor(menu.status)}>
                        {menu.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{menu.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">Launch: {menu.timeline}</span>
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
              Be part of our growth story! Follow us on social media for the latest updates on new locations, 
              menu additions, and exciting developments.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" onClick={handleSubscribeUpdates}>
                Subscribe to Updates
              </Button>
              <Button variant="outline" onClick={handleCareerOpportunities}>
                Career Opportunities
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturePlans;