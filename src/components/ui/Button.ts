/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { createMotionConfig } from '../../utils/motionHelpers';
import { clsx, tw } from '../../utils/tailwindHelpers';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: string;
  onClick?: string;
  className?: string;
  type?: 'button' | 'submit';
  id?: string;
  form?: string;
  dataPage?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button(props: ButtonProps): string {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    children,
    onClick,
    className = '',
    type = 'button',
    id,
    form,
    dataPage,
    href,
    target,
    rel
  } = props;

  const baseClasses = tw.button.base;
  
  const variantClasses = {
    primary: tw.button.primary,
    secondary: tw.button.secondary
  };
  
  const sizeClasses = tw.button.sizes;

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  const finalClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  );

  const motionConfig = createMotionConfig('buttonTap');

  const loadingSpinner = loading ? `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ` : '';

  const commonAttributes = `
    class="${finalClasses}"
    data-motion='${motionConfig}'
    ${disabled ? 'disabled' : ''}
    ${id ? `id="${id}"` : ''}
    ${form ? `form="${form}"` : ''}
    ${dataPage ? `data-page="${dataPage}"` : ''}
  `.trim();

  // If href is provided, render as anchor
  if (href) {
    return `
      <a href="${href}" 
         ${target ? `target="${target}"` : ''}
         ${rel ? `rel="${rel}"` : ''}
         ${commonAttributes}>
        ${loadingSpinner}${children}
      </a>
    `;
  }

  // Otherwise render as button
  return `
    <button type="${type}"
            ${onClick ? `onclick="${onClick}"` : ''}
            ${commonAttributes}>
      ${loadingSpinner}${children}
    </button>
  `;
} 