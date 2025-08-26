import React from 'react';
import { MenuCategory as MenuCategoryType } from '@/types/menu';
import { MenuCard } from './MenuCard';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface MenuCategoryProps {
  category: MenuCategoryType;
  onAddToCart?: (item: any) => void;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ 
  category, 
  onAddToCart 
}) => {
  return (
    <section className="space-y-6" id={`category-${category.id}`}>
      {/* Category Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {category.name}
          </h2>
          {category.isPopular && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
        
        {category.description && (
          <p className="text-gray-600 text-lg">
            {category.description}
          </p>
        )}
        
        <div className="text-sm text-gray-500">
          {category.items.length} item{category.items.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuCategory;
