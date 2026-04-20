import { Button } from "@/components/ui/button";
import { Phone, MapPin, Menu as MenuIcon, ShoppingBag, BookOpen, PenSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import VasanthsKitchenLogo from "@/components/ui/logo";
import { useQuery } from '@tanstack/react-query';
import { api, getImageUrl } from '@/services/api';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Book Table', href: '/book-table' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const location = useLocation();
  const { data: config } = useQuery({ queryKey: ['site_config'], queryFn: api.getSiteConfig });

  const orderNow = () => {
    if (location.pathname === '/') {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.href = '/#menu';
  };

  return (
    <header className="bg-white shadow-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
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

          <nav className="hidden lg:flex items-center space-x-6 font-medium">
            {navLinks.map((link) => {
              const isActive = link.href === '/'
                ? location.pathname === '/'
                : location.pathname === link.href || location.pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground/80'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="hero"
              size="sm"
              className="hidden sm:flex"
              onClick={orderNow}
            >
              <ShoppingBag className="h-4 w-4" />
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
                  <div className="mt-8 space-y-8">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Order & Booking</p>
                      <button type="button" onClick={orderNow} className="flex items-center gap-2 text-left text-lg font-medium hover:text-primary transition-colors">
                        <ShoppingBag className="h-4 w-4" />
                        Order Now
                      </button>
                      <Link to="/book-table" className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                        <BookOpen className="h-4 w-4" />
                        Book Table
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Explore</p>
                      {navLinks.map((link) => (
                        <Link key={link.href} to={link.href} className="block text-lg font-medium hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      ))}
                      <Link to="/about#gallery" className="block pl-5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Gallery</Link>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Support</p>
                      <a href="tel:+919442434269" className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                        <Phone className="h-4 w-4" />
                        Call Support
                      </a>
                      <Link to="/blog" className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                        <PenSquare className="h-4 w-4" />
                        Latest Updates
                      </Link>
                    </div>

                    <Button
                      variant="hero"
                      className="mt-4 w-full"
                      onClick={orderNow}
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
