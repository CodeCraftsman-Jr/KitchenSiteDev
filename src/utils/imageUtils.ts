// Utility functions for handling menu item images

/**
 * Generates a placeholder image URL for menu items
 * Uses a food-specific placeholder service or fallback to a generic placeholder
 */
export const getMenuItemImage = (itemName: string, isVeg: boolean = true): string => {
  // Use a food-specific placeholder service
  const encodedName = encodeURIComponent(itemName);
  const category = isVeg ? 'vegetarian' : 'food';
  
  // Using Unsplash for high-quality food images
  return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
};

/**
 * Gets a category-specific placeholder image
 */
export const getCategoryImage = (categoryName: string): string => {
  const categoryImages: Record<string, string> = {
    'appetizers': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'main-course': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'south-indian': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'chinese': 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
  };
  
  return categoryImages[categoryName.toLowerCase()] || categoryImages['main-course'];
};

/**
 * Gets specific food item images from Unsplash
 */
export const getFoodItemImages = (): Record<string, string> => {
  return {
    // Idli Varieties
    'plain-idli': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'ghee-idli': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'idli-podimass': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'mini-idli': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Dosa Varieties
    'plain-dosa': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'masala-dosa': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'onion-dosa': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'rava-dosa': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Uttapam
    'plain-uttapam': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'tomato-uttapam': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'onion-uttapam': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Rice Dishes
    'plain-rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'curd-rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'lemon-rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'tomato-rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'carrot-rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'beetroot-rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Chicken 65
    'chicken-65': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'chicken-65-boneless': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Paniyaram Varieties
    'kuli-paniyaram': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'sweet-paniyaram': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'ghee-paniyaram': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Tea and Coffee
    'milk': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'tea': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'coffee': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'boost': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'horlicks': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'ginger-tea': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Side Dishes
    'omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'double-omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'onion-omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'onion-double-omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'egg-podimas': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'boiled-egg': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Milk Based Drinks
    'rose-milk': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'rose-milk-large': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'pista-milk': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'badam-milk': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    'choco-milk': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',

    // Restaurant hero image
    'restaurant-hero': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop&crop=center&auto=format&q=80',
  };
};

/**
 * Updates menu data with proper image URLs
 */
export const updateMenuImagesWithUrls = (menuData: any) => {
  const imageMap = getFoodItemImages();
  
  // Update restaurant image
  if (menuData.restaurant) {
    menuData.restaurant.image = imageMap['restaurant-hero'];
  }
  
  // Update category item images
  menuData.categories?.forEach((category: any) => {
    category.items?.forEach((item: any) => {
      const imageKey = item.image.replace('/images/', '').replace('.jpg', '');
      if (imageMap[imageKey]) {
        item.image = imageMap[imageKey];
      }
    });
  });
  
  return menuData;
};
