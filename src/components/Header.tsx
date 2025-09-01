import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import VasanthsKitchenLogo from "@/components/ui/logo";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity duration-300"
              aria-label="Vasanth's Kitchen - Home"
            >
              <VasanthsKitchenLogo variant="full" size="md" />
            </Link>
            <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>+91 9442434269</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Puducherry, India</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {location.pathname === '/' ? (
              <>
                <a href="#menu" className="text-foreground hover:text-primary transition-colors">Menu</a>
                <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Reviews</a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
              </>
            ) : (
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            )}
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="hero"
              size="sm"
              onClick={() => {
                // Scroll to menu section if on home page, otherwise navigate to menu
                if (location.pathname === '/') {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#menu';
                }
              }}
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;