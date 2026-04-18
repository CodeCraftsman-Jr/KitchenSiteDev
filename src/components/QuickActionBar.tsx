import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { BookOpen, Menu, Phone, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const QuickActionBar = () => {
  const location = useLocation();
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const onMenuClick = () => {
    if (location.pathname === "/") {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = "/#menu";
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2 px-3 py-2">
        <Button variant="ghost" size="sm" className="h-auto flex-col gap-1 py-2" onClick={onMenuClick}>
          <Menu className="h-4 w-4" />
          <span className="text-xs">Menu</span>
        </Button>

        <Button variant="ghost" size="sm" className="relative h-auto flex-col gap-1 py-2" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart className="h-4 w-4" />
          <span className="text-xs">Cart</span>
          {totalItems > 0 && (
            <span className="absolute right-3 top-1 rounded-full bg-primary px-1.5 text-[10px] text-white">
              {totalItems}
            </span>
          )}
        </Button>

        <Button variant="ghost" size="sm" className="h-auto flex-col gap-1 py-2" asChild>
          <Link to="/book-table">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Book</span>
          </Link>
        </Button>

        <Button variant="ghost" size="sm" className="h-auto flex-col gap-1 py-2" asChild>
          <a href="tel:+919442434269">
            <Phone className="h-4 w-4" />
            <span className="text-xs">Call</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default QuickActionBar;
