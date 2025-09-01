import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, Users, Utensils, Shield } from "lucide-react";
import { useProfilePhotoAnimation } from "@/hooks/useIntersectionObserver";

const RestaurantDetails = () => {
  const highlights = [
    { icon: Users, title: "Student Focused", description: "Healthy meals for students" },
    { icon: Award, title: "Young Entrepreneur", description: "19-year-old founder" },
    { icon: Utensils, title: "Home-Style Cooking", description: "Traditional family recipes" },
    { icon: Shield, title: "Food Safety", description: "FSSAI certified kitchen" }
  ];

  const staff = [
    {
      name: "Vasanthan",
      role: "Owner",
      experience: "Founder & Student Entrepreneur",
      specialty: "Business Operations",
      image: "/src/assets/staff/owner.JPG"
    },
    {
      name: "Kitchen Manager",
      role: "Manager",
      experience: "Operations Management",
      specialty: "Quality Control & Coordination",
      image: "/src/assets/staff/Manager.jpg"
    },
    {
      name: "Head Cook",
      role: "Cook",
      experience: "Traditional South Indian Cuisine",
      specialty: "Dosa & Idli Specialist",
      image: "/src/assets/staff/cook.jpg"
    },
    {
      name: "Kitchen Staff",
      role: "Staff",
      experience: "Food Preparation & Service",
      specialty: "Customer Service",
      image: "/src/assets/staff/staff.jpg"
    },
    {
      name: "Assistant Cook",
      role: "Assistant Cook",
      experience: "Food Preparation Support",
      specialty: "Ingredient Preparation",
      image: "/src/assets/staff/assistant cook.jpg"
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
            Vasanth's Kitchen was founded with a passion to serve healthy home-style foods which mainly focuses on students. As myself, I am a 19-year-old student and entrepreneur who started this business at a young age during my college days to solve the problems which I faced. This is the first step I took with the efforts I made. I had opened up this cloud kitchen and will do more in the future. Hope everyone does support me as you usually do. Thank you, Vasanthan From Pondicherry (Owner of Vasanth's Kitchen) - one important thing, all these can't be achieved without my parents' support (Elumalai (Dad) - Staff At Pondicherry University, Abirami (Mom))
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
                      Plot No: 50, 51 Mettu Street,<br />
                      Chinna Kalapet, Puducherry
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Operating Hours</p>
                    <p className="text-muted-foreground">
                      Mon - Sun: 9:00 AM - 12:00 PM<br />
                      Fresh breakfast and morning meals
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

          {/* Location Map */}
          <Card className="shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Find Us</h3>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.283786803163!2d79.85658649999999!3d12.0239735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5365007e082633%3A0x6f47ab94b86d09f0!2sVasanth&#39;s%20Kitchen!5e0!3m2!1sen!2sin!4v1756202116491!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{border: 0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vasanth's Kitchen Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Details */}
        <div>
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {staff.map((member, index) => {
              const StaffMemberCard = () => {
                const { elementRef, animationClasses } = useProfilePhotoAnimation('staff', index * 200);

                return (
                  <Card
                    ref={elementRef}
                    className="text-center shadow-card hover:shadow-warm transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-3 border-primary relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className={`w-full h-full object-cover transition-all duration-500 ${animationClasses}`}
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <h4 className="text-lg font-bold text-primary mb-1">{member.name}</h4>
                      <p className="text-warm-orange font-semibold mb-1">{member.role}</p>
                      <p className="text-muted-foreground text-sm mb-2">{member.experience}</p>
                      <Badge variant="secondary" className="text-xs">{member.specialty}</Badge>
                    </CardContent>
                  </Card>
                );
              };

              return <StaffMemberCard key={member.name} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetails;