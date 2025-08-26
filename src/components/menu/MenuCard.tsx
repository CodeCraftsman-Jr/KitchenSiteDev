import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Flame, Leaf } from 'lucide-react';
import { MenuItem } from '@/types/menu';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart?.(item);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {item.isVeg ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Leaf className="w-3 h-3 mr-1" />
              Veg
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
              <div className="w-3 h-3 mr-1 bg-red-600 rounded-sm"></div>
              Non-Veg
            </Badge>
          )}
          
          {item.isSpicy && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
              <Flame className="w-3 h-3 mr-1" />
              Spicy
            </Badge>
          )}
          
          {item.isPopular && (
            <Badge className="bg-yellow-500 text-white">
              Popular
            </Badge>
          )}
          
          {item.isNew && (
            <Badge className="bg-blue-500 text-white">
              New
            </Badge>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-white text-gray-900 font-semibold text-sm">
            ₹{item.price}
            {item.originalPrice && (
              <span className="ml-1 text-xs text-gray-500 line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and rating */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {item.name}
            </h3>
            {item.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{item.rating}</span>
                {item.reviewCount && (
                  <span className="text-gray-500">({item.reviewCount})</span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Preparation time */}
          {item.preparationTime && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{item.preparationTime}</span>
            </div>
          )}

          {/* Add to cart button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
