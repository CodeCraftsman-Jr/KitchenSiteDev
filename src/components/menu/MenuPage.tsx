import React, { useState, useMemo } from 'react';
import { MenuCategory } from './MenuCategory';
import { MenuFilters } from './MenuFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import JSONLD from '@/components/JSONLD';
import Cart from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { api, getImageUrl } from '@/services/api';
import { getCanonicalUrl } from '@/lib/seo';
import {
  Star,
  Clock,
  MapPin,
  Phone,
  ShoppingCart,
  Percent
} from 'lucide-react';
import { MenuFilters as MenuFiltersType, MenuItem } from '@/types/menu';
import { useLocation, useParams } from 'react-router-dom';
import { slugify } from '@/lib/slug';
import { useEffect } from 'react';

type MenuItemDoc = {
  $id: string;
  name: string;
  description?: string;
  price: number;
  image_file_id?: string;
  is_veg?: boolean;
  is_spicy?: boolean;
  is_popular?: boolean;
  rating?: number;
  review_count?: number;
  preparation_time?: string;
  category_id?: string;
};

type CategoryDoc = {
  $id: string;
  name: string;
  description?: string;
  is_popular?: boolean;
};

type OfferDoc = {
  $id: string;
  title: string;
  description?: string;
  code?: string;
};

type MenuSchemaItem = {
  '@type': 'MenuItem';
  name: string;
  description: string;
  offers: {
    '@type': 'Offer';
    priceCurrency: 'INR';
    price: number;
    availability: string;
    url: string;
  };
};

type MenuSchemaSection = {
  '@type': 'MenuSection';
  name: string;
  hasMenuItem: MenuSchemaItem[];
};

export const MenuPage: React.FC = () => {
  const location = useLocation();
  const { categorySlug, itemSlug } = useParams();
  const [filters, setFilters] = useState<MenuFiltersType>({
    dietary: 'all',
    search: '',
    category: undefined,
  });

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalAmount,
    getTotalItems,
    isCartOpen,
    setIsCartOpen
  } = useCart();
  const { toast } = useToast();

  const { data: config } = useQuery({
    queryKey: ['site_config'],
    queryFn: api.getSiteConfig,
  });

  const { data: categoryDocs = [] } = useQuery<CategoryDoc[]>({
    queryKey: ['menu_categories'],
    queryFn: api.getCategories,
  });

  const { data: menuItemDocs = [] } = useQuery<MenuItemDoc[]>({
    queryKey: ['menu_items'],
    queryFn: api.getMenuItems,
  });

  const { data: offers = [] } = useQuery<OfferDoc[]>({
    queryKey: ['offers'],
    queryFn: api.getOffers,
  });

  const normalizedItems = useMemo<MenuItem[]>(() => {
    return menuItemDocs.map((item) => ({
      id: item.$id,
      name: item.name,
      description: item.description || 'Freshly prepared by our kitchen.',
      price: item.price,
      image: item.image_file_id ? getImageUrl(item.image_file_id) : '/images/default-food.jpg',
      isVeg: Boolean(item.is_veg),
      isSpicy: Boolean(item.is_spicy),
      isPopular: Boolean(item.is_popular),
      rating: item.rating,
      reviewCount: item.review_count,
      preparationTime: item.preparation_time,
    }));
  }, [menuItemDocs]);

  const menuCategories = useMemo(() => {
    return categoryDocs.map((category) => {
      const items = menuItemDocs
        .filter((item) => item.category_id === category.$id)
        .map((item) => normalizedItems.find((normalized) => normalized.id === item.$id))
        .filter((item): item is MenuItem => Boolean(item));

      return {
        id: category.$id,
        name: category.name,
        description: category.description,
        isPopular: Boolean(category.is_popular),
        items,
      };
    }).filter((category) => category.items.length > 0);
  }, [categoryDocs, menuItemDocs, normalizedItems]);

  useEffect(() => {
    if (!categorySlug || menuCategories.length === 0) {
      return;
    }

    const matchedCategory = menuCategories.find((category) => slugify(category.name) === categorySlug);
    if (!matchedCategory) {
      return;
    }

    setFilters((previous) => {
      if (previous.category === matchedCategory.id) {
        return previous;
      }

      return {
        ...previous,
        category: matchedCategory.id,
      };
    });
  }, [categorySlug, menuCategories]);

  useEffect(() => {
    if (!itemSlug || menuCategories.length === 0) {
      return;
    }

    const matchedItem = menuCategories
      .flatMap((category) => category.items)
      .find((item) => slugify(item.name) === itemSlug);

    if (!matchedItem) {
      return;
    }

    setFilters((previous) => {
      if (previous.search.toLowerCase() === matchedItem.name.toLowerCase()) {
        return previous;
      }

      return {
        ...previous,
        search: matchedItem.name,
      };
    });

    setTimeout(() => {
      document.getElementById(`menu-item-${matchedItem.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  }, [itemSlug, menuCategories]);

  const menuSchema = useMemo(() => {
    const sections: MenuSchemaSection[] = menuCategories.map((category) => ({
      '@type': 'MenuSection',
      name: category.name,
      hasMenuItem: category.items.slice(0, 20).map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: item.price,
          availability: 'https://schema.org/InStock',
          url: getCanonicalUrl('/menu'),
        },
      })),
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: "Vasanth's Kitchen Menu",
      hasMenuSection: sections,
      url: getCanonicalUrl('/menu'),
    };
  }, [menuCategories]);

  // Filter menu items based on current filters
  const filteredCategories = useMemo(() => {
    return menuCategories.map(category => {
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
  }, [filters, menuCategories]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    // Navigate to checkout page or show checkout modal
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to checkout page...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <SEO
        title="Online Menu and Ordering"
        description="Explore our full menu with veg and non-veg options, filter your favorites, and place your order online in minutes."
        path={location.pathname}
      />
      <JSONLD id="menu" data={menuSchema} />
      <Header />
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Restaurant Image */}
            <div className="lg:col-span-1">
              <img
                src={config?.hero_image_file_id ? getImageUrl(config.hero_image_file_id) : '/images/restaurant-hero.jpg'}
                alt={config?.site_name || "Vasanth's Kitchen"}
                className="w-full h-64 lg:h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Restaurant Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {config?.site_name || "Vasanth's Kitchen"}
                </h1>
                <p className="text-gray-600 mt-2">
                  {config?.hero_subtitle || 'Authentic South Indian cuisine with traditional flavors and fresh ingredients.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['South Indian', 'Biryani', 'Fresh Juices'].map((cuisine) => (
                  <Badge key={cuisine} variant="secondary">
                    {cuisine}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-500">(400+)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>25-35 mins</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{config?.address || 'Chinna Kalapet, Puducherry'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{config?.phone || '+91 9442434269'}</span>
                </div>
              </div>

              {/* Offers */}
              {offers.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Current Offers</h3>
                  <div className="flex flex-wrap gap-2">
                    {offers.map((offer) => (
                      <Card key={offer.$id} className="border-orange-200 bg-orange-50">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-orange-600" />
                            <div>
                              <div className="font-semibold text-orange-800">
                                {offer.title}
                              </div>
                              <div className="text-xs text-orange-600">
                                {offer.description || 'Limited time offer'}
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
        categories={menuCategories.map(cat => ({ id: cat.id, name: cat.name }))}
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
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg rounded-full px-6 py-3"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {getTotalItems()} items • ₹{getTotalAmount()}
          </Button>
        </div>
      )}

      {/* Cart Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default MenuPage;
