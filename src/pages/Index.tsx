import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import Blog from "@/components/Blog";
import DeliveryOptions from "@/components/DeliveryOptions";
import RestaurantDetails from "@/components/RestaurantDetails";
import OfficialDocuments from "@/components/OfficialDocuments";
import ContactUs from "@/components/ContactUs";
import FuturePlans from "@/components/FuturePlans";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Menu />
      <Reviews />
      <Blog />
      <DeliveryOptions />
      <RestaurantDetails />
      <OfficialDocuments />
      <ContactUs />
      <FuturePlans />
    </div>
  );
};

export default Index;