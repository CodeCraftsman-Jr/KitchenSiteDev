import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, Users, Utensils, Shield, Loader2 } from "lucide-react";
import { useProfilePhotoAnimation } from "@/hooks/useIntersectionObserver";
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import AppwriteImage from "@/components/AppwriteImage";
import ProfileCard from "@/components/ProfileCard";
import DomeGallery from "@/components/DomeGallery";
import { getImageUrl } from "@/services/api";

const RestaurantDetails = () => {
  const { data: config } = useQuery({ queryKey: ['site_config'], queryFn: api.getSiteConfig });
  const highlights = [
    { icon: Users, title: "Student Focused", description: "Healthy meals for students" },
    { icon: Award, title: "Young Entrepreneur", description: "19-year-old founder" },
    { icon: Utensils, title: "Home-Style Cooking", description: "Traditional family recipes" },
    { icon: Shield, title: "Food Safety", description: "FSSAI certified kitchen" }
  ];

  const { data: staffMembers = [], isLoading: isLoadingStaff } = useQuery({
    queryKey: ['staff_members'],
    queryFn: api.getStaffMembers,
  });

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Restaurant Story */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            Our Story & Heritage
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {config?.restaurant_description || "Vasanth's Kitchen was founded with a passion to serve healthy home-style foods which mainly focuses on students. As myself, I am a 19-year-old student and entrepreneur who started this business at a young age during my college days to solve the problems which I faced. This is the first step I took with the efforts I made. I had opened up this cloud kitchen and will do more in the future. Hope everyone does support me as you usually do. Thank you, Vasanthan From Pondicherry (Owner of Vasanth's Kitchen) - one important thing, all these can't be achieved without my parents' support (Elumalai (Dad) - Staff At Pondicherry University, Abirami (Mom))"}
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
                      {config?.address ? config.address.split('\n').map((line: string, i: number) => <span key={i}>{line}<br /></span>) : (
                        <>
                          Plot No: 50, 51 Mettu Street,<br />
                          Chinna Kalapet, Puducherry
                        </>
                      )}
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
        <div className="kitchen-texture-bg spice-pattern-bg py-8 rounded-2xl">
          <h3 className="text-3xl font-bold text-primary text-center mb-12 parallax-bg">Meet Our Team</h3>
          {isLoadingStaff ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : staffMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-[1600px] mx-auto px-4 py-12">
              {staffMembers.map((member: any) => (
                <ProfileCard
                  key={member.$id}
                  name={member.name}
                  title={member.role}
                  handle={member.specialty?.toLowerCase().replace(/\s+/g, '') || "staff"}
                  status="Active"
                  avatarUrl={member.image_file_id ? getImageUrl(member.image_file_id) : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"}
                  behindGlowColor="rgba(255, 107, 0, 0.4)"
                  innerGradient="linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Dome Gallery Section */}
      <DomeGallery />
    </section>
  );
};

export default RestaurantDetails;