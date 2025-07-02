/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassObject = Record<string, any>;
type ClassInput = ClassValue | ClassArray | ClassObject;

/**
 * Simplified clsx implementation for class name concatenation
 * Handles strings, objects, and arrays of class names
 */
export function clsx(...inputs: ClassInput[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const result = clsx(...input);
      if (result) classes.push(result);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Conditionally apply classes based on a condition
 */
export function cn(condition: boolean, trueClasses: string, falseClasses: string = ''): string {
  return condition ? trueClasses : falseClasses;
}

/**
 * Merge Tailwind classes with conflict resolution
 * Later classes override earlier conflicting classes
 */
export function twMerge(...classes: (string | undefined)[]): string {
  const classMap = new Map<string, string>();
  
  // Tailwind prefixes that conflict with each other
  const conflictGroups = [
    // Spacing
    ['p-', 'pt-', 'pr-', 'pb-', 'pl-', 'px-', 'py-'],
    ['m-', 'mt-', 'mr-', 'mb-', 'ml-', 'mx-', 'my-'],
    // Colors
    ['text-', 'bg-', 'border-'],
    // Sizing
    ['w-', 'h-'],
    // Display
    ['block', 'inline', 'inline-block', 'flex', 'grid', 'hidden'],
    // Position
    ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    // Flexbox
    ['justify-', 'items-', 'content-', 'self-'],
    // Grid
    ['grid-cols-', 'col-span-', 'row-span-'],
    // Typography
    ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
    ['font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold']
  ];

  const allClasses = classes.filter(Boolean).join(' ').split(' ').filter(Boolean);

  for (const className of allClasses) {
    let conflictKey = className;
    
    // Find conflict group
    for (const group of conflictGroups) {
      for (const prefix of group) {
        if (className.startsWith(prefix) || group.includes(className)) {
          conflictKey = prefix;
          break;
        }
      }
    }
    
    classMap.set(conflictKey, className);
  }

  return Array.from(classMap.values()).join(' ');
}

/**
 * Create variant classes based on props
 */
export function createVariants<T extends Record<string, Record<string, string>>>(
  variants: T
) {
  return function(props: { [K in keyof T]?: keyof T[K] }) {
    const classes: string[] = [];
    
    for (const [variantName, variantValue] of Object.entries(props)) {
      if (variantValue && variants[variantName] && variants[variantName][variantValue as string]) {
        classes.push(variants[variantName][variantValue as string]);
      }
    }
    
    return classes.join(' ');
  };
}

/**
 * Common Tailwind class combinations
 */
export const tw = {
  // Layout
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-16',
  
  // Flex utilities
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  
  // Grid utilities
  gridCols: {
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  },
  
  // Typography
  heading: {
    1: 'text-4xl md:text-5xl font-bold font-primary',
    2: 'text-3xl md:text-4xl font-bold font-primary',
    3: 'text-2xl md:text-3xl font-semibold font-primary',
    4: 'text-xl md:text-2xl font-semibold font-primary'
  },
  
  // Buttons
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg focus:ring-primary-500',
    secondary: 'bg-white hover:bg-gray-50 text-primary-500 border border-primary-500 hover:border-primary-600 focus:ring-primary-500',
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },
  
  // Cards
  card: {
    base: 'bg-white rounded-xl shadow-card overflow-hidden transition-shadow duration-200',
    hover: 'hover:shadow-card-hover',
    level: {
      1: 'border border-[#c8e6c9] bg-[#e9f5e9]',
      2: 'border border-[#ffecb3] bg-[#fff8e1]',
      3: 'border border-[#ffcdd2] bg-[#ffebee]'
    }
  },
  
  // Animations
  animate: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    pulse: 'animate-pulse-data',
    float: 'animate-float',
    spin: 'animate-spin',
    bounce: 'animate-bounce-subtle'
  }
};

/**
 * Responsive breakpoint utilities
 */
export function responsive(config: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}): string {
  const classes: string[] = [];
  
  if (config.base) classes.push(config.base);
  if (config.sm) classes.push(`sm:${config.sm}`);
  if (config.md) classes.push(`md:${config.md}`);
  if (config.lg) classes.push(`lg:${config.lg}`);
  if (config.xl) classes.push(`xl:${config.xl}`);
  
  return classes.join(' ');
}

/**
 * Focus and accessibility utilities
 */
export const a11y = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  srOnly: 'sr-only',
  skipLink: 'absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden focus:left-6 focus:top-7 focus:w-auto focus:h-auto focus:overflow-visible'
}; 