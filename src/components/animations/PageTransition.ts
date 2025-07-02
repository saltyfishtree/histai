/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { createMotionConfig } from '../../utils/motionHelpers';

interface PageTransitionProps {
  children: string;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps): string {
  const motionConfig = createMotionConfig('slideUp', {
    transition: { duration: 0.5, ease: 'easeOut' }
  });

  return `
    <div class="motion-page-transition ${className}" 
         data-motion='${motionConfig}'>
      ${children}
    </div>
  `;
}

interface FadeInWhenVisibleProps {
  children: string;
  delay?: number;
  className?: string;
}

export function FadeInWhenVisible({ 
  children, 
  delay = 0, 
  className = '' 
}: FadeInWhenVisibleProps): string {
  const motionConfig = JSON.stringify({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay }
  });

  return `
    <div class="motion-fade-in ${className}"
         data-motion='${motionConfig}'>
      ${children}
    </div>
  `;
}

interface StaggerContainerProps {
  children: string;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: StaggerContainerProps): string {
  const motionConfig = JSON.stringify({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: staggerDelay }
  });

  return `
    <div class="motion-stagger-container ${className}"
         data-motion='${motionConfig}'>
      ${children}
    </div>
  `;
} 