import Header from "@/components/Header";
import RestaurantDetails from "@/components/RestaurantDetails";
import FuturePlans from "@/components/FuturePlans";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const { hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
        title="About Our Kitchen, Team and Story"
        description="Learn about Vasanth's Kitchen, our team, food values, quality standards, and our growth journey in Puducherry."
        path="/about"
      />
      <Header />
      <div className="pt-8">
        <RestaurantDetails />
      </div>
      <FuturePlans />
    </div>
  );
};

export default About;
