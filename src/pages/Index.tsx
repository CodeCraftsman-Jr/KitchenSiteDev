import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import DeliveryOptions from "@/components/DeliveryOptions";
import RestaurantDetails from "@/components/RestaurantDetails";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Menu />
      <Reviews />
      <DeliveryOptions />
      <RestaurantDetails />
    </div>
  );
};

export default Index;