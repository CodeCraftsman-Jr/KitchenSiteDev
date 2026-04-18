import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import DeliveryOptions from "@/components/DeliveryOptions";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="min-h-screen relative font-sans text-foreground bg-background">
      <SEO
        title="Home Style Food Delivery and Dine-In in Puducherry"
        description="Order fresh home-style meals from Vasanth's Kitchen. Browse menu, add to cart, get doorstep delivery, or book dine-in in Puducherry."
        path="/"
      />
      <Header />
      <Hero />
      <Menu />
      <DeliveryOptions />
      <Reviews />
    </div>
  );
};

export default Home;
