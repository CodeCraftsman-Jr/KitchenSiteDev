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

  // Generate realistic reviews based on actual menu items
  const generateReviews = () => {
    const names = ["Priya Sharma", "Rajesh Kumar", "Anita Patel", "Vikram Singh", "Sneha Gupta", "Amit Verma", "Kavya Reddy", "Ravi Mehta", "Pooja Jain", "Arjun Nair", "Divya Shah", "Kiran Patel", "Sanjay Rao", "Meera Iyer", "Rohit Agarwal", "Deepika Nair", "Suresh Babu", "Lakshmi Devi", "Arun Kumar", "Nisha Reddy"];
    const menuBasedComments = [
      "The Plain Idli was so soft and fluffy! Perfect with the sambar and chutneys. Authentic South Indian taste.",
      "Ordered the Ghee Idli and it was absolutely divine. The aroma of ghee made it so special. Will order again!",
      "Plain Dosa was crispy and perfectly made. The coconut chutney was fresh and delicious.",
      "Masala Dosa was amazing! The potato filling was well-spiced and the dosa was golden brown. Loved it!",
      "Curd Rice was so comforting and perfectly seasoned. Reminded me of home-cooked food.",
      "Lemon Rice had the perfect tangy flavor. Great for a light meal. Packaging was excellent too.",
      "Chicken 65 was crispy and spicy - exactly how it should be! Fresh and hot delivery.",
      "Rose Milk was refreshing and had the perfect sweetness. Great quality for the price.",
      "Plain Uttapam was thick and fluffy. Served with good quality sambar and chutneys.",
      "Onion Uttapam had generous onion toppings. Cooked to perfection and very tasty.",
      "Tea was perfectly brewed with the right amount of milk and sugar. Authentic taste.",
      "Boost drink was creamy and chocolatey. Kids loved it! Good portion size.",
      "The Fried Idli was a unique twist - crispy outside, soft inside. Very innovative!",
      "Paper Roast Dosa was huge and crispy! Great value for money. Highly recommended.",
      "Tomato Rice was flavorful and had fresh tomato taste. Perfect comfort food.",
      "Badam Milk was rich and creamy. You can taste the real almonds. Premium quality.",
      "Mini Idlis were cute and perfectly steamed. Great for kids and easy to eat.",
      "Ghee Dosa had the perfect amount of ghee. Crispy and aromatic. Excellent!",
      "The sambar quality is outstanding - authentic South Indian taste with perfect spices.",
      "Coconut chutney was fresh and creamy. You can tell they use fresh coconuts.",
      "Delivery was quick and food was still hot. Great packaging keeps everything fresh.",
      "As a student, this place is perfect - affordable, tasty, and reminds me of home food.",
      "Being from Tamil Nadu, I can say this is authentic South Indian cuisine. Highly recommended!",
      "The portion sizes are generous and the taste is consistent every time I order."
    ];
    const dates = ["2 hours ago", "5 hours ago", "1 day ago", "2 days ago", "3 days ago", "1 week ago", "2 weeks ago", "3 weeks ago", "1 month ago"];

    const allReviews = [];
    for (let i = 1; i <= 450; i++) {
      allReviews.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        rating: Math.random() > 0.1 ? 5 : Math.random() > 0.3 ? 4 : 3,
        comment: menuBasedComments[Math.floor(Math.random() * menuBasedComments.length)],
        date: dates[Math.floor(Math.random() * dates.length)],
        verified: Math.random() > 0.15
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
              <p className="text-sm">Based on 400+ reviews</p>
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