import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'light' | 'dark';
}

const VasanthsKitchenLogo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 'md', 
  className = '',
  theme = 'light'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const colors = {
    light: {
      primary: '#D97706', // warm-orange
      secondary: '#F59E0B', // golden-yellow
      accent: '#92400E', // warm-brown
      text: '#1F2937'
    },
    dark: {
      primary: '#FCD34D',
      secondary: '#F59E0B',
      accent: '#FBBF24',
      text: '#F9FAFB'
    }
  };

  const currentColors = colors[theme];

  // SVG Icon Component - South Indian Kitchen Elements
  const LogoIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle with Gradient */}
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={currentColors.secondary} stopOpacity="0.2" />
          <stop offset="100%" stopColor={currentColors.primary} stopOpacity="0.1" />
        </radialGradient>
        <linearGradient id="panGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.accent} />
          <stop offset="100%" stopColor={currentColors.primary} />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={currentColors.primary} />
          <stop offset="100%" stopColor={currentColors.secondary} />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" stroke={currentColors.primary} strokeWidth="2"/>
      
      {/* Traditional South Indian Dosa Pan */}
      <ellipse cx="50" cy="45" rx="25" ry="8" fill="url(#panGradient)" />
      <ellipse cx="50" cy="43" rx="25" ry="8" fill={currentColors.accent} opacity="0.3" />
      
      {/* Pan Handle */}
      <rect x="75" y="42" width="15" height="3" rx="1.5" fill={currentColors.accent} />
      <circle cx="92" cy="43.5" r="2" fill={currentColors.primary} />
      
      {/* Cooking Flames */}
      <path 
        d="M35 55 Q37 50 35 48 Q38 52 40 48 Q42 52 45 48 Q47 52 50 48 Q52 52 55 48 Q57 52 60 48 Q62 52 65 48 Q67 52 65 55" 
        fill="url(#flameGradient)" 
        opacity="0.8"
      />
      
      {/* Steam/Aroma Lines */}
      <path d="M40 35 Q42 30 40 28" stroke={currentColors.secondary} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M50 33 Q52 28 50 26" stroke={currentColors.secondary} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M60 35 Q62 30 60 28" stroke={currentColors.secondary} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      
      {/* Decorative Spice Dots */}
      <circle cx="25" cy="25" r="1.5" fill={currentColors.primary} opacity="0.7" />
      <circle cx="75" cy="25" r="1.5" fill={currentColors.secondary} opacity="0.7" />
      <circle cx="25" cy="75" r="1.5" fill={currentColors.accent} opacity="0.7" />
      <circle cx="75" cy="75" r="1.5" fill={currentColors.primary} opacity="0.7" />
      
      {/* Traditional Pattern Border */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={currentColors.primary} strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
    </svg>
  );

  // Text Component
  const LogoText = () => (
    <div className={`font-bold ${textSizes[size]} ${className}`} style={{ color: currentColors.text }}>
      <span style={{ color: currentColors.primary }}>Vasanth's</span>
      <span className="ml-1" style={{ color: currentColors.accent }}>Kitchen</span>
    </div>
  );

  // Render based on variant
  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  // Full logo with icon and text
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default VasanthsKitchenLogo;
