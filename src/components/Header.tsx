import { Button } from "@/components/ui/button";
import { Phone, MapPin, Menu as MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import VasanthsKitchenLogo from "@/components/ui/logo";
import { useQuery } from '@tanstack/react-query';
import { api, getImageUrl } from '@/services/api';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const { data: config } = useQuery({ queryKey: ['site_config'], queryFn: api.getSiteConfig });

  return (
    <header className="bg-white shadow-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity duration-300"
              aria-label={config?.site_name || "Vasanth's Kitchen - Home"}
            >
              {config?.logo_file_id ? (
                <img src={getImageUrl(config.logo_file_id)} alt="Logo" className="h-10 object-contain" />
              ) : (
                <VasanthsKitchenLogo variant="full" size="md" />
              )}
            </Link>
            <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{config?.phone || '+91 9442434269'}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{config?.address ? config.address.split(',').pop()?.trim() : 'Puducherry, India'}</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium">
            <Link to="/" className={`transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-foreground/80'}`}>Home</Link>
            <Link to="/about" className={`transition-colors hover:text-primary ${location.pathname === '/about' ? 'text-primary' : 'text-foreground/80'}`}>About & Gallery</Link>
            <Link to="/blog" className={`transition-colors hover:text-primary ${location.pathname === '/blog' ? 'text-primary' : 'text-foreground/80'}`}>Blog</Link>
            <Link to="/book-table" className={`transition-colors hover:text-primary ${location.pathname === '/book-table' ? 'text-primary' : 'text-foreground/80'}`}>Book Table</Link>
            <Link to="/contact" className={`transition-colors hover:text-primary ${location.pathname === '/contact' ? 'text-primary' : 'text-foreground/80'}`}>Contact & Support</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="hero"
              size="sm"
              className="hidden sm:flex"
              onClick={() => {
                if (location.pathname === '/') {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#menu';
                }
              }}
            >
              Order Now
            </Button>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8">
                    <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">Home & Menu</Link>
                    <Link to="/about" className="text-lg font-medium hover:text-primary transition-colors">About Us & Team</Link>
                    <Link to="/about#gallery" className="text-lg font-medium hover:text-primary transition-colors pl-4 text-muted-foreground">- Gallery</Link>
                    <Link to="/blog" className="text-lg font-medium hover:text-primary transition-colors">Blog & Updates</Link>
                    <Link to="/book-table" className="text-lg font-medium hover:text-primary transition-colors">Book Table</Link>
                    <Link to="/contact" className="text-lg font-medium hover:text-primary transition-colors">Contact & Documents</Link>
                    <Button
                      variant="hero"
                      className="mt-4 w-full"
                      onClick={() => window.location.href = '/#menu'}
                    >
                      Order Now
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
