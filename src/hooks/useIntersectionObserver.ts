import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If triggerOnce is true and already triggered, don't observe
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && triggerOnce) {
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    elementRef,
    isIntersecting: triggerOnce ? (hasTriggered || isIntersecting) : isIntersecting,
    hasTriggered
  };
};

// Hook specifically for profile photo animations
export const useProfilePhotoAnimation = (
  animationType: 'staff' | 'user' = 'staff',
  delay: number = 0
) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '50px',
    triggerOnce: true
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay]);

  // Get animation classes based on type
  const getAnimationClasses = () => {
    if (!shouldAnimate) return 'opacity-0';

    const baseClasses = 'opacity-100';

    if (animationType === 'staff') {
      // Enhanced cook-themed animations for staff with advanced effects
      const cookAnimations = [
        'animate-fade-in-up animate-pan-flip-3d profile-sparkles sizzling-effect',
        'animate-scale-in animate-stir-motion-complex gradient-overlay',
        'animate-slide-in-left animate-cooking-bounce-3d profile-sparkles',
        'animate-fade-in-up animate-chef-wiggle-enhanced sizzling-effect'
      ];
      const randomAnimation = cookAnimations[Math.floor(Math.random() * cookAnimations.length)];
      return `${baseClasses} ${randomAnimation} enhanced-profile floating-card`;
    } else {
      // Enhanced animations for user avatars with subtle effects
      const userAnimations = [
        'animate-fade-in-up gradient-overlay',
        'animate-scale-in profile-sparkles',
        'animate-slide-in-left floating-card'
      ];
      const randomAnimation = userAnimations[Math.floor(Math.random() * userAnimations.length)];
      return `${baseClasses} ${randomAnimation} enhanced-profile`;
    }
  };

  return {
    elementRef,
    animationClasses: getAnimationClasses(),
    shouldAnimate
  };
};
