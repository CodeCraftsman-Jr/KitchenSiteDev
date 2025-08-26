import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DeliveryOptions = () => {
  const { toast } = useToast();

  const handleOrderNow = (platform: string) => {
    toast({
      title: "Redirecting...",
      description: `Opening ${platform} to place your order.`,
    });

    // Redirect to the respective platform
    if (platform === "Zomato") {
      window.open("https://www.zomato.com/puducherry/vasanths-kitchen-auroville", "_blank");
    } else if (platform === "Swiggy") {
      window.open("https://www.swiggy.com/city/pondicherry/vasanths-kitchen-kalapet-auroville-rest967996", "_blank");
    }
    // For Direct Delivery, keep the existing behavior (just show toast)
  };

  const handleCallNow = () => {
    toast({
      title: "Calling...",
      description: "Initiating call to +91 9442434269",
    });
    // In a real app, this would initiate a phone call
    window.open('tel:+919442434269');
  };
  const deliveryOptions = [
    {
      name: "Swiggy",
      icon: "🛵",
      time: "25-30 mins",
      fee: "Free above ₹199",
      color: "bg-orange-500"
    },
    {
      name: "Zomato", 
      icon: "🍽️",
      time: "30-35 mins",
      fee: "Free above ₹249",
      color: "bg-red-500"
    },
    {
      name: "Direct Delivery",
      icon: "🚚",
      time: "20-25 mins",
      fee: "Free above ₹149",
      color: "bg-primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Multiple Ways to Order
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred delivery method for the fastest service
          </p>
        </div>
        
        {/* Delivery Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {deliveryOptions.map((option) => (
            <Card key={option.name} className="text-center shadow-card hover:shadow-warm transition-all duration-300 group">
              <CardContent className="p-8">
                <div className={`w-20 h-20 ${option.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{option.name}</h3>
                <div className="space-y-2 text-muted-foreground mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{option.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>{option.fee}</span>
                  </div>
                </div>
                <Button
                  variant="order"
                  className="w-full"
                  onClick={() => handleOrderNow(option.name)}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Contact for Booking */}
        <div className="bg-gradient-warm rounded-2xl p-8 text-center text-white max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Want to Pre-Order or Make a Booking?</h3>
          <p className="text-xl mb-8 text-white/90">
            Call us directly for special requests, bulk orders, or table reservations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">+91 9442434269</span>
            </div>
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white hover:text-primary"
              onClick={handleCallNow}
            >
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryOptions;