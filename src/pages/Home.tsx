import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import DeliveryOptions from "@/components/DeliveryOptions";
import SEO from "@/components/SEO";
import JSONLD from "@/components/JSONLD";
import { getCanonicalUrl } from "@/lib/seo";
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
      <JSONLD
        id="restaurant"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: "Vasanth's Kitchen",
          image: [getCanonicalUrl('/images/restaurant-hero.jpg')],
          telephone: '+91 9442434269',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Puducherry',
            addressCountry: 'IN',
          },
          servesCuisine: ['South Indian', 'Biryani', 'Indian Breakfast'],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '400',
          },
          url: getCanonicalUrl('/'),
        }}
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
