import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Leaf, X } from 'lucide-react';
import { MenuFilters as MenuFiltersType, DietaryFilter, SortOption } from '@/types/menu';

interface MenuFiltersProps {
  filters: MenuFiltersType;
  onFiltersChange: (filters: MenuFiltersType) => void;
  categories: Array<{ id: string; name: string }>;
}

export const MenuFilters: React.FC<MenuFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
}) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleDietaryFilterChange = (dietary: DietaryFilter) => {
    onFiltersChange({ ...filters, dietary });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ 
      ...filters, 
      category: category === 'all' ? undefined : category 
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dietary: 'all',
      search: '',
      category: undefined,
    });
  };

  const hasActiveFilters = filters.dietary !== 'all' || 
                          filters.search !== '' || 
                          filters.category;

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-[72px] z-40 py-4 shadow-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for dishes..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full max-w-sm sm:max-w-md"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {/* Dietary Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Diet:</span>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  variant={filters.dietary === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDietaryFilterChange('all')}
                >
                  All
                </Button>
                <Button
                  variant={filters.dietary === 'veg' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDietaryFilterChange('veg')}
                  className="text-green-700 border-green-200 hover:bg-green-50"
                >
                  <Leaf className="w-3 h-3 mr-1" />
                  Veg
                </Button>
                <Button
                  variant={filters.dietary === 'non-veg' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDietaryFilterChange('non-veg')}
                  className="text-red-700 border-red-200 hover:bg-red-50"
                >
                  <div className="w-3 h-3 mr-1 bg-red-600 rounded-sm"></div>
                  Non-Veg
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Category:</span>
              <Select
                value={filters.category || 'all'}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-3 h-3 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {filters.dietary !== 'all' && (
                <Badge variant="secondary" className="capitalize">
                  {filters.dietary}
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary">
                  {categories.find(c => c.id === filters.category)?.name}
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary">
                  Search: "{filters.search}"
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuFilters;
