import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely amazing food! The biryani was perfectly spiced and the delivery was super quick. Best cloud kitchen in Mumbai!",
      date: "2 days ago",
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Outstanding butter chicken and excellent service. The food arrived hot and fresh. Highly recommended!",
      date: "1 week ago",
      verified: true
    },
    {
      id: 3,
      name: "Anita Patel",
      rating: 4,
      comment: "Great variety and authentic flavors. The sweets were especially delicious. Will definitely order again!",
      date: "2 weeks ago",
      verified: true
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-golden-yellow fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who love our authentic cuisine
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(5)}</div>
              <span className="text-3xl font-bold text-primary">4.9</span>
            </div>
            <div className="text-muted-foreground">
              <p className="text-lg font-medium">Excellent</p>
              <p className="text-sm">Based on 2,847 reviews</p>
            </div>
          </div>
        </div>
        
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-primary">{review.name}</h4>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                  <p className="text-muted-foreground pl-6 italic">"{review.comment}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Add Review Button */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Have you tried our food? Share your experience!</p>
          <Button variant="hero">
            Write a Review
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;