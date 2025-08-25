import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, Users, Utensils, Shield } from "lucide-react";

const RestaurantDetails = () => {
  const highlights = [
    { icon: Award, title: "Award Winning", description: "50+ culinary awards" },
    { icon: Users, title: "Expert Chefs", description: "15+ years experience" },
    { icon: Utensils, title: "Fresh Ingredients", description: "Daily sourced produce" },
    { icon: Shield, title: "Food Safety", description: "FSSAI certified kitchen" }
  ];

  const staff = [
    {
      name: "Chef Ramesh Kumar",
      role: "Head Chef",
      experience: "18 years",
      specialty: "North Indian Cuisine",
      initials: "RK"
    },
    {
      name: "Priya Mehta",
      role: "Sous Chef",
      experience: "12 years", 
      specialty: "South Indian Delicacies",
      initials: "PM"
    },
    {
      name: "Arjun Singh",
      role: "Kitchen Manager",
      experience: "10 years",
      specialty: "Operations & Quality",
      initials: "AS"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Restaurant Story */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            Our Story & Heritage
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Founded in 2018, Spice Kitchen began as a passion project to bring authentic Indian flavors 
            to the modern world. Our cloud kitchen model allows us to focus entirely on what matters most - 
            creating exceptional food with traditional recipes passed down through generations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Service</div>
            </div>
          </div>
        </div>

        {/* Highlights & Specialties */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Our Highlights & Specialties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight) => (
              <Card key={highlight.title} className="text-center shadow-card hover:shadow-warm transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">{highlight.title}</h4>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Restaurant Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Card className="shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Restaurant Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      Plot No. 15, Food Court Complex,<br />
                      Andheri East, Mumbai - 400069
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Operating Hours</p>
                    <p className="text-muted-foreground">
                      Mon - Sun: 11:00 AM - 11:00 PM<br />
                      Late night delivery available
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Certifications</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">FSSAI Licensed</Badge>
                      <Badge variant="secondary">ISO 22000</Badge>
                      <Badge variant="secondary">Halal Certified</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Map Placeholder */}
          <Card className="shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Find Us</h3>
              <div className="bg-gradient-food rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-primary">Interactive Map</p>
                  <p className="text-muted-foreground">
                    Google Maps integration available<br />
                    Click to view detailed location
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Details */}
        <div>
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {staff.map((member) => (
              <Card key={member.name} className="text-center shadow-card hover:shadow-warm transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    {member.initials}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">{member.name}</h4>
                  <p className="text-warm-orange font-semibold mb-1">{member.role}</p>
                  <p className="text-muted-foreground mb-2">{member.experience} experience</p>
                  <Badge variant="secondary">{member.specialty}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetails;