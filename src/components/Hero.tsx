import { Button } from "@/components/ui/button";
import { Star, Award, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { api, getImageUrl } from '@/services/api';
import { motion } from 'framer-motion';

const Hero = () => {
  const { data: config } = useQuery({
    queryKey: ['site_config'],
    queryFn: api.getSiteConfig,
  });

  const bgImage = config?.hero_image_file_id 
    ? getImageUrl(config.hero_image_file_id) 
    : '/images/restaurant-hero.jpg';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Particles/Emojis background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-4xl opacity-20"
            initial={{ 
              y: '100%', 
              x: `${Math.random() * 100}%`,
              rotate: 0 
            }}
            animate={{ 
              y: '-10%', 
              x: `${Math.random() * 100}%`,
              rotate: 360 
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            {['🥘', '🍲', '🍛', '🍱', '🍗', '🍚'][i % 6]}
          </motion.div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {config?.hero_title ? config.hero_title.split(' ').slice(0, -2).join(' ') : 'Authentic Flavors'}
            <br />
            <span className="text-golden-yellow">
              {config?.hero_title ? config.hero_title.split(' ').slice(-2).join(' ') : 'Delivered Fresh'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            {config?.hero_subtitle || "Experience the finest cloud kitchen with traditional recipes, modern techniques, and exceptional taste delivered to your doorstep."}
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
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-golden-yellow blur-[40px] opacity-30 animate-pulse" />
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
              onClick={() => {
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Order Now
            </Button>
            <Link to="/menu">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;