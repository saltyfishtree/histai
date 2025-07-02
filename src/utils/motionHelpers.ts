/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { MotionVariant } from '../types/types';

interface MotionVariants {
  fadeIn: MotionVariant;
  slideUp: MotionVariant;
  slideDown: MotionVariant;
  slideLeft: MotionVariant;
  slideRight: MotionVariant;
  staggerContainer: MotionVariant;
  staggerChild: MotionVariant;
  scaleIn: MotionVariant;
  rotateIn: MotionVariant;
  bounceIn: MotionVariant;
  cardHover: MotionVariant;
  buttonTap: MotionVariant;
}

export const motionVariants: MotionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  slideDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  slideLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  slideRight: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      }
    }
  },
  
  staggerChild: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  
  rotateIn: {
    initial: { opacity: 0, rotateY: -15 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 15 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 500, 
        damping: 25 
      }
    },
    exit: { opacity: 0, scale: 0.3 }
  },
  
  cardHover: {
    whileHover: { 
      y: -4, 
      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' 
    },
    transition: { 
      type: 'spring', 
      stiffness: 300 
    }
  },
  
  buttonTap: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 17 
    }
  }
};

export function createMotionConfig(
  variant: keyof MotionVariants, 
  options?: Partial<MotionVariant>
): string {
  const baseVariant = motionVariants[variant];
  const mergedVariant = { ...baseVariant, ...options };
  return JSON.stringify(mergedVariant);
}

export function createStaggerConfig(
  delay = 0.1, 
  childDelay = 0.2
): string {
  return JSON.stringify({
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: delay, 
        delayChildren: childDelay 
      }
    }
  });
}

export function createHoverConfig(
  scale = 1.02, 
  y = -2
): string {
  return JSON.stringify({
    whileHover: { scale, y },
    transition: { 
      type: 'spring', 
      stiffness: 300 
    }
  });
}

export function createTapConfig(
  scale = 0.95
): string {
  return JSON.stringify({
    whileTap: { scale },
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 17 
    }
  });
}

export function createInViewConfig(
  delay = 0
): string {
  return JSON.stringify({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay }
  });
} 