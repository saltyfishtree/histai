/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface MotionElementConfig {
  element: HTMLElement;
  config: any;
}

class MotionSystem {
  private observers: IntersectionObserver[] = [];
  private animatedElements = new Set<HTMLElement>();

  async initializeMotion(): Promise<void> {
    try {
      // Dynamic import of Framer Motion for code splitting
      // @ts-ignore - Dynamic import for optional dependency
      const { motion, animate, inView } = await import('framer-motion');
      
      // Find all elements with motion data attributes
      const motionElements = document.querySelectorAll('[data-motion]');
      
      motionElements.forEach(element => {
        this.setupMotionForElement(element as HTMLElement, { motion, animate, inView });
      });

    } catch (error) {
      console.warn('Framer Motion not available, falling back to CSS animations:', error);
      this.fallbackToCSSAnimations();
    }
  }

  private setupMotionForElement(
    element: HTMLElement, 
    motionLibrary: any
  ): void {
    try {
      const configStr = element.getAttribute('data-motion');
      if (!configStr) return;

      const config = JSON.parse(configStr);
      const { motion, animate, inView } = motionLibrary;

      // Apply initial state
      if (config.initial) {
        Object.assign(element.style, this.convertToCSS(config.initial));
      }

      // Setup intersection observer for whileInView animations
      if (config.whileInView) {
        this.setupInViewAnimation(element, config, inView);
        return;
      }

      // Setup hover animations
      if (config.whileHover) {
        this.setupHoverAnimation(element, config);
      }

      // Setup tap animations
      if (config.whileTap) {
        this.setupTapAnimation(element, config);
      }

      // Apply immediate animations
      if (config.animate) {
        this.animateElement(element, config.animate, config.transition);
      }

    } catch (error) {
      console.warn('Failed to setup motion for element:', error);
    }
  }

  private setupInViewAnimation(element: HTMLElement, config: any, inView: any): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animatedElements.has(element)) {
            this.animatedElements.add(element);
            this.animateElement(element, config.whileInView, config.transition);
            
            if (config.viewport?.once) {
              observer.unobserve(element);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(element);
    this.observers.push(observer);
  }

  private setupHoverAnimation(element: HTMLElement, config: any): void {
    const originalStyles = this.getCurrentStyles(element);
    
    element.addEventListener('mouseenter', () => {
      this.animateElement(element, config.whileHover, config.transition);
    });

    element.addEventListener('mouseleave', () => {
      this.animateElement(element, originalStyles, config.transition);
    });
  }

  private setupTapAnimation(element: HTMLElement, config: any): void {
    const originalStyles = this.getCurrentStyles(element);
    
    element.addEventListener('mousedown', () => {
      this.animateElement(element, config.whileTap, config.transition);
    });

    element.addEventListener('mouseup', () => {
      this.animateElement(element, originalStyles, config.transition);
    });

    element.addEventListener('mouseleave', () => {
      this.animateElement(element, originalStyles, config.transition);
    });
  }

  private animateElement(element: HTMLElement, targetStyles: any, transition?: any): void {
    const cssStyles = this.convertToCSS(targetStyles);
    const duration = transition?.duration || 0.3;
    const ease = transition?.ease || 'ease-out';
    
    // Apply CSS transition
    element.style.transition = `all ${duration}s ${ease}`;
    
    // Apply target styles
    Object.assign(element.style, cssStyles);
  }

  private convertToCSS(motionStyles: any): Record<string, string> {
    const cssStyles: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(motionStyles)) {
      switch (key) {
        case 'x':
          cssStyles.transform = (cssStyles.transform || '') + ` translateX(${value}px)`;
          break;
        case 'y':
          cssStyles.transform = (cssStyles.transform || '') + ` translateY(${value}px)`;
          break;
        case 'scale':
          cssStyles.transform = (cssStyles.transform || '') + ` scale(${value})`;
          break;
        case 'rotateY':
          cssStyles.transform = (cssStyles.transform || '') + ` rotateY(${value}deg)`;
          break;
        case 'opacity':
          cssStyles.opacity = String(value);
          break;
        case 'boxShadow':
          cssStyles.boxShadow = String(value);
          break;
        default:
          if (typeof value === 'string' || typeof value === 'number') {
            cssStyles[key] = String(value);
          }
      }
    }
    
    return cssStyles;
  }

  private getCurrentStyles(element: HTMLElement): any {
    const computed = getComputedStyle(element);
    return {
      opacity: computed.opacity,
      transform: computed.transform !== 'none' ? computed.transform : '',
      boxShadow: computed.boxShadow
    };
  }

  private fallbackToCSSAnimations(): void {
    // Apply CSS-only animations for elements that have motion configs
    const motionElements = document.querySelectorAll('[data-motion]');
    
    motionElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      
      // Add CSS animation classes based on element type
      if (htmlElement.classList.contains('motion-fade-in')) {
        htmlElement.classList.add('animate-fade-in');
      }
      if (htmlElement.classList.contains('motion-slide-up')) {
        htmlElement.classList.add('animate-slide-up');
      }
      if (htmlElement.classList.contains('motion-page-transition')) {
        htmlElement.classList.add('animate-slide-up');
      }
    });
  }

  // Setup stagger animations for containers
  setupStaggerAnimation(container: HTMLElement, delay: number = 0.1): void {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      const htmlChild = child as HTMLElement;
      htmlChild.style.animationDelay = `${index * delay}s`;
    });
  }

  // Cleanup function
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.animatedElements.clear();
  }

  // Re-initialize motion for dynamic content
  reinitialize(): void {
    this.destroy();
    this.initializeMotion();
  }
}

// Create singleton instance
export const motionSystem = new MotionSystem();

// Initialize motion system when DOM is ready
export function initializeMotionSystem(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      motionSystem.initializeMotion();
    });
  } else {
    motionSystem.initializeMotion();
  }
}

// Utility function to reinitialize motion after dynamic content updates
export function reinitializeMotion(): void {
  motionSystem.reinitialize();
} 