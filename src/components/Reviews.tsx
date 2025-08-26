import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reviews = () => {
  const [displayedReviews, setDisplayedReviews] = useState(6);
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();

  const handleWriteReview = () => {
    toast({
      title: "Write a Review",
      description: "Redirecting to review form...",
    });
    // In a real app, this would open a review form or redirect to a review platform
  };

  // Generate more reviews for demonstration
  const generateReviews = () => {
    const names = ["Priya Sharma", "Rajesh Kumar", "Anita Patel", "Vikram Singh", "Sneha Gupta", "Amit Verma", "Kavya Reddy", "Ravi Mehta", "Pooja Jain", "Arjun Nair", "Divya Shah", "Kiran Patel", "Sanjay Rao", "Meera Iyer", "Rohit Agarwal"];
    const comments = [
      "Absolutely amazing food! The dosas were perfectly crispy and the delivery was super quick. Best South Indian kitchen in Puducherry!",
      "Outstanding butter chicken and excellent service. The food arrived hot and fresh. Highly recommended!",
      "Great variety and authentic flavors. The sweets were especially delicious. Will definitely order again!",
      "Fantastic experience! Quick delivery and incredible taste. The tandoori items are exceptional.",
      "Best cloud kitchen I've ordered from. Consistent quality and amazing customer service.",
      "Fresh ingredients and authentic recipes. The dal makhani is to die for!",
      "Excellent packaging and still hot when delivered. Great value for money.",
      "Amazing spice levels and portion sizes. Will definitely be ordering regularly.",
      "Professional service and delicious food. The biryanis are restaurant quality.",
      "Love the variety in the menu. Something for everyone in the family.",
      "Prompt delivery and courteous staff. Food quality is consistently excellent.",
      "Authentic flavors that remind me of home. Highly recommended for Indian cuisine lovers.",
      "Great experience overall. The online ordering is smooth and delivery is reliable.",
      "Fresh and flavorful food. The customer support team is very responsive.",
      "Excellent quality control. Never had a bad experience with this kitchen."
    ];
    const dates = ["2 hours ago", "5 hours ago", "1 day ago", "2 days ago", "3 days ago", "1 week ago", "2 weeks ago", "3 weeks ago", "1 month ago"];
    
    const allReviews = [];
    for (let i = 1; i <= 1247; i++) {
      allReviews.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        rating: Math.random() > 0.15 ? 5 : Math.random() > 0.5 ? 4 : 3,
        comment: comments[Math.floor(Math.random() * comments.length)],
        date: dates[Math.floor(Math.random() * dates.length)],
        verified: Math.random() > 0.1
      });
    }
    return allReviews;
  };

  const reviews = generateReviews();
  const reviewsToShow = showAll ? reviews : reviews.slice(0, displayedReviews);

  const loadMoreReviews = () => {
    if (displayedReviews >= reviews.length) {
      setShowAll(true);
    } else {
      setDisplayedReviews(prev => Math.min(prev + 6, reviews.length));
    }
  };

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
              <p className="text-sm">Based on {reviews.length.toLocaleString()} reviews</p>
            </div>
          </div>
        </div>
        
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviewsToShow.map((review) => (
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
        
        {/* Load More Reviews */}
        {!showAll && displayedReviews < reviews.length && (
          <div className="text-center mt-8">
            <Button variant="outline" onClick={loadMoreReviews} className="mr-4">
              Load More Reviews ({displayedReviews}/{reviews.length})
            </Button>
          </div>
        )}
        
        {/* Add Review Button */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Have you tried our food? Share your experience!</p>
          <Button variant="hero" onClick={handleWriteReview}>
            Write a Review
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;