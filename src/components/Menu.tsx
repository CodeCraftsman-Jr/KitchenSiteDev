import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import biryaniImage from "@/assets/biryani.jpg";
import butterChickenImage from "@/assets/butter-chicken.jpg";
import sweetsImage from "@/assets/sweets.jpg";

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Special Chicken Biryani",
      description: "Aromatic basmati rice layered with tender chicken and traditional spices",
      price: "₹299",
      rating: 4.9,
      image: biryaniImage,
      category: "Main Course",
      spicy: true
    },
    {
      id: 2,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with succulent chicken pieces",
      price: "₹349",
      rating: 4.8,
      image: butterChickenImage,
      category: "Main Course",
      spicy: false
    },
    {
      id: 3,
      name: "Assorted Sweets Platter",
      description: "Traditional Indian sweets including gulab jamun, rasgulla & barfi",
      price: "₹199",
      rating: 4.7,
      image: sweetsImage,
      category: "Desserts",
      spicy: false
    }
  ];

  return (
    <section id="menu" className="py-20 bg-gradient-food">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Signature Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted dishes using traditional recipes and the finest ingredients
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="menu" className="rounded-full">All Items</Button>
          <Button variant="outline" className="rounded-full">Main Course</Button>
          <Button variant="outline" className="rounded-full">Appetizers</Button>
          <Button variant="outline" className="rounded-full">Desserts</Button>
          <Button variant="outline" className="rounded-full">Beverages</Button>
        </div>
        
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={item.spicy ? "destructive" : "secondary"}>
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                  <Star className="h-4 w-4 text-golden-yellow fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-deep-red">{item.price}</span>
                  <Button variant="order" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View Full Menu */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;