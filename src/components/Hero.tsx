import { Button } from "@/components/ui/button";
import { Star, Award, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Authentic Flavors
            <br />
            <span className="text-golden-yellow">Delivered Fresh</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Experience the finest cloud kitchen with traditional recipes, modern techniques, and exceptional taste delivered to your doorstep.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-golden-yellow fill-current" />
                <span className="text-3xl font-bold ml-1">4.9</span>
              </div>
              <p className="text-white/80">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-golden-yellow" />
                <span className="text-3xl font-bold ml-1">50+</span>
              </div>
              <p className="text-white/80">Awards</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-golden-yellow" />
                <span className="text-3xl font-bold ml-1">30min</span>
              </div>
              <p className="text-white/80">Delivery</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-golden-yellow" />
                <span className="text-3xl font-bold ml-1">10K+</span>
              </div>
              <p className="text-white/80">Customers</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
              Order Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto bg-white/10 text-white border-white hover:bg-white hover:text-primary">
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;