import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  MapPin, 
  Clock,
  ExternalLink
} from "lucide-react";

const ContactUs = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      primary: "+91 98765 43210",
      secondary: "+91 87654 32109",
      action: "tel:+919876543210",
      available: "24/7 Customer Support",
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      primary: "orders@spicekitchen.com",
      secondary: "support@spicekitchen.com",
      action: "mailto:orders@spicekitchen.com",
      available: "Response within 2 hours",
      color: "text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      primary: "+91 98765 43210",
      secondary: "Quick Support",
      action: "https://wa.me/919876543210",
      available: "Instant messaging",
      color: "text-green-500"
    },
    {
      icon: Send,
      title: "Telegram",
      primary: "@SpiceKitchenSupport",
      secondary: "Live Chat",
      action: "https://t.me/SpiceKitchenSupport",
      available: "Real-time assistance",
      color: "text-blue-500"
    }
  ];

  const branches = [
    {
      name: "Andheri East - Main Kitchen",
      address: "Plot No. 15, Food Court Complex, Andheri East, Mumbai - 400069",
      phone: "+91 98765 43210",
      email: "andheri@spicekitchen.com",
      timing: "11:00 AM - 11:00 PM",
      status: "Operational",
      manager: "Rajesh Kumar"
    },
    {
      name: "Bandra West - Branch",
      address: "Shop No. 8, Linking Road, Bandra West, Mumbai - 400050",
      phone: "+91 87654 32109",
      email: "bandra@spicekitchen.com",
      timing: "12:00 PM - 10:00 PM",
      status: "Operational",
      manager: "Priya Sharma"
    },
    {
      name: "Powai - Branch",
      address: "Office No. 12, Hiranandani Gardens, Powai, Mumbai - 400076",
      phone: "+91 76543 21098",
      email: "powai@spicekitchen.com",
      timing: "11:30 AM - 10:30 PM",
      status: "Operational",
      manager: "Amit Verma"
    },
    {
      name: "Thane - Coming Soon",
      address: "Ghodbunder Road, Thane West, Mumbai - 400607",
      phone: "Coming Soon",
      email: "thane@spicekitchen.com",
      timing: "Opening April 2024",
      status: "Under Construction",
      manager: "TBA"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Reach out to us through any of these channels for quick support and assistance.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method) => (
            <Card key={method.title} className="shadow-card hover:shadow-warm transition-all duration-300 group text-center">
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-warm flex items-center justify-center mx-auto mb-4 ${method.color}`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{method.title}</h3>
                <p className="text-primary font-semibold mb-1">{method.primary}</p>
                <p className="text-sm text-muted-foreground mb-3">{method.secondary}</p>
                <Badge variant="secondary" className="mb-4 text-xs">
                  {method.available}
                </Badge>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white" asChild>
                  <a href={method.action} target="_blank" rel="noopener noreferrer">
                    Contact Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">Phone</label>
                    <Input placeholder="Your phone number" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Email</label>
                  <Input type="email" placeholder="Your email address" />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Subject</label>
                  <Input placeholder="What is this about?" />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Message</label>
                  <Textarea placeholder="Tell us how we can help you..." rows={5} />
                </div>
                <Button variant="hero" className="w-full">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Quick Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Operating Hours</h4>
                    <p className="text-muted-foreground">Monday - Sunday: 11:00 AM - 11:00 PM</p>
                    <p className="text-sm text-muted-foreground">Late night delivery available</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Main Kitchen</h4>
                    <p className="text-muted-foreground">Plot No. 15, Food Court Complex, Andheri East, Mumbai - 400069</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Emergency Contact</h4>
                    <p className="text-muted-foreground">+91 98765 43210 (24/7 Available)</p>
                  </div>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Need Immediate Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">For urgent order issues or complaints</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Branch Details */}
        <div>
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Our Branches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch, index) => (
              <Card key={index} className="shadow-card hover:shadow-warm transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-primary">{branch.name}</h4>
                    <Badge 
                      variant={branch.status === "Operational" ? "default" : "secondary"}
                      className={branch.status === "Operational" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                    >
                      {branch.status}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{branch.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{branch.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{branch.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{branch.timing}</p>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Manager:</span> {branch.manager}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;