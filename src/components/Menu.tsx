import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useQuery } from '@tanstack/react-query';
import { api, getImageUrl } from '@/services/api';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menu_items'],
    queryFn: api.getMenuItems
  });

  const { data: categoryData = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  // Derived categories from category data
  const categories = ["All Items", ...categoryData.map(c => c.name)];

  const filteredMenuItems = activeCategory === "All Items"
    ? menuItems
    : menuItems.filter(item => {
        // Find category name by category_id or fallback to item's category name (if stored directly)
        const catName = categoryData.find(c => c.$id === item.category_id)?.name || item.category_id;
        return catName === activeCategory;
      });

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

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
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "menu" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Menu Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading Menu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredMenuItems.slice(0, 6).map((item) => (
              <Card key={item.$id} className="overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={getImageUrl(item.image_file_id) || '/images/default-food.jpg'} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-100"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={item.is_spicy ? "destructive" : "secondary"}>
                      {categoryData.find(c => c.$id === item.category_id)?.name || 'Dish'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-golden-yellow fill-current" />
                    <span className="text-sm font-medium">{item.rating || '4.5'}</span>
                  </div>
                </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{item.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-deep-red">₹{item.price}</span>
                  <Button
                    variant="order"
                    size="sm"
                    onClick={() => handleAddToCart({...item, id: item.$id, image: getImageUrl(item.image_file_id)})}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
        
        {/* View Full Menu */}
        <div className="text-center mt-12">
          <Link to="/menu">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
              View Full Menu
            </Button>
          </Link>
        </div>

        {/* Cart Indicator */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-warm-orange text-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-medium">
                Cart: {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;