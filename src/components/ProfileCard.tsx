import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './ProfileCard.css';

interface ProfileCardProps {
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  avatarUrl?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
  behindGlowColor?: string;
  iconUrl?: string;
  behindGlowEnabled?: boolean;
  innerGradient?: string;
}

const ProfileCard = ({
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact Me",
  avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick = () => console.log('Contact clicked'),
  behindGlowColor = "rgba(255, 107, 0, 0.67)", // Updated default to kitchen orange glow
  iconUrl = "https://reactbits.dev/assets/demo/iconpattern.png",
  behindGlowEnabled = true,
  innerGradient = "linear-gradient(145deg, #2c2c2c 0%, #000000 100%)"
}: ProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !enableTilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="pc-wrapper">
      {behindGlowEnabled && (
        <div 
          className="pc-behind-glow" 
          style={{ backgroundColor: behindGlowColor }}
        />
      )}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
          background: innerGradient
        }}
        className="pc-card group"
      >
        <div className="pc-shine" />
        
        {/* Full Card Avatar Background */}
        <div className="absolute inset-0 z-0">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        </div>

        <div className="pc-content z-10 flex flex-col justify-end h-full min-h-[360px]">
          <div className="pc-text-section mb-6">
            <h3 className="pc-name">{name}</h3>
            <p className="pc-title font-medium text-primary drop-shadow-md">{title}</p>
          </div>

          {showUserInfo && (
            <div className="pc-bottom-bar mt-auto">
              <div className="pc-user-meta w-full justify-between">
                <div className="pc-meta-text">
                  <span className="pc-handle">@{handle}</span>
                </div>
                <div className="pc-status">
                  <span className="pc-status-dot" />
                  {status}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
