export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounted items
  image: string;
  isVeg: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
  preparationTime?: string;
  calories?: number;
  allergens?: string[];
  customizations?: MenuCustomization[];
}

export interface MenuCustomization {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
  isPopular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  image: string;
  address: string;
  phone: string;
  isOpen: boolean;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
}

export interface MenuData {
  restaurant: Restaurant;
  categories: MenuCategory[];
  offers?: Offer[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  minimumOrder?: number;
  validUntil?: string;
  code?: string;
}

// Utility types for filtering and sorting
export type DietaryFilter = 'all' | 'veg' | 'non-veg';
export type SortOption = 'popularity' | 'price-low-high' | 'price-high-low' | 'rating';

export interface MenuFilters {
  dietary: DietaryFilter;
  search: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}
