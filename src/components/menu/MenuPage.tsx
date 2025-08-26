import React, { useState, useMemo } from 'react';
import { MenuCategory } from './MenuCategory';
import { MenuFilters } from './MenuFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import {
  Star,
  Clock,
  MapPin,
  Phone,
  ShoppingCart,
  Percent
} from 'lucide-react';
import { MenuData, MenuFilters as MenuFiltersType, MenuItem } from '@/types/menu';
import menuData from '@/data/menuData';

export const MenuPage: React.FC = () => {
  const [filters, setFilters] = useState<MenuFiltersType>({
    dietary: 'all',
    search: '',
    category: undefined,
  });

  const [cart, setCart] = useState<MenuItem[]>([]);

  // Filter menu items based on current filters
  const filteredCategories = useMemo(() => {
    return menuData.categories.map(category => {
      const filteredItems = category.items.filter(item => {
        // Dietary filter
        if (filters.dietary === 'veg' && !item.isVeg) return false;
        if (filters.dietary === 'non-veg' && item.isVeg) return false;

        // Search filter
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(searchTerm);
          const matchesDescription = item.description.toLowerCase().includes(searchTerm);
          if (!matchesName && !matchesDescription) return false;
        }

        // Category filter
        if (filters.category && category.id !== filters.category) return false;

        return true;
      });

      return {
        ...category,
        items: filteredItems,
      };
    }).filter(category => category.items.length > 0);
  }, [filters]);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => [...prev, item]);
    // You can add toast notification here
    console.log(`Added ${item.name} to cart`);
  };

  const totalCartValue = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header />
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Restaurant Image */}
            <div className="lg:col-span-1">
              <img
                src={menuData.restaurant.image}
                alt={menuData.restaurant.name}
                className="w-full h-64 lg:h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Restaurant Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {menuData.restaurant.name}
                </h1>
                <p className="text-gray-600 mt-2">
                  {menuData.restaurant.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {menuData.restaurant.cuisine.map((cuisine) => (
                  <Badge key={cuisine} variant="secondary">
                    {cuisine}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{menuData.restaurant.rating}</span>
                  <span className="text-gray-500">({menuData.restaurant.reviewCount})</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{menuData.restaurant.deliveryTime}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{menuData.restaurant.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{menuData.restaurant.phone}</span>
                </div>
              </div>

              {/* Offers */}
              {menuData.offers && menuData.offers.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Current Offers</h3>
                  <div className="flex flex-wrap gap-2">
                    {menuData.offers.map((offer) => (
                      <Card key={offer.id} className="border-orange-200 bg-orange-50">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-orange-600" />
                            <div>
                              <div className="font-semibold text-orange-800">
                                {offer.title}
                              </div>
                              <div className="text-xs text-orange-600">
                                {offer.description}
                              </div>
                              {offer.code && (
                                <div className="text-xs font-mono bg-orange-200 text-orange-800 px-1 rounded mt-1 inline-block">
                                  {offer.code}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Filters */}
      <MenuFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={menuData.categories.map(cat => ({ id: cat.id, name: cat.name }))}
      />

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <MenuCategory
                key={category.id}
                category={category}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No items found matching your filters.
              </div>
              <Button
                variant="outline"
                onClick={() => setFilters({ dietary: 'all', search: '', category: undefined })}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg rounded-full px-6 py-3">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {cart.length} items • ₹{totalCartValue}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
