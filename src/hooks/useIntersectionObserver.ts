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

    const baseClasses = 'opacity-100 profile-hover-effect';
    
    if (animationType === 'staff') {
      // Rotate through different cook-themed animations for staff
      const cookAnimations = [
        'animate-fade-in-up animate-pan-flip',
        'animate-scale-in animate-stir-motion',
        'animate-slide-in-left animate-cooking-bounce',
        'animate-fade-in-up animate-chef-wiggle'
      ];
      const randomAnimation = cookAnimations[Math.floor(Math.random() * cookAnimations.length)];
      return `${baseClasses} ${randomAnimation} animate-glow-pulse`;
    } else {
      // Simpler animations for user avatars
      const userAnimations = [
        'animate-fade-in-up',
        'animate-scale-in',
        'animate-slide-in-left'
      ];
      const randomAnimation = userAnimations[Math.floor(Math.random() * userAnimations.length)];
      return `${baseClasses} ${randomAnimation}`;
    }
  };

  return {
    elementRef,
    animationClasses: getAnimationClasses(),
    shouldAnimate
  };
};
