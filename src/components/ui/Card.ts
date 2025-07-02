/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { createMotionConfig } from '../../utils/motionHelpers';

interface CardProps {
  children: string;
  className?: string;
  hoverable?: boolean;
  clickable?: boolean;
  level?: 1 | 2 | 3;
  onClick?: string;
  id?: string;
}

export function Card(props: CardProps): string {
  const {
    children,
    className = '',
    hoverable = false,
    clickable = false,
    level,
    onClick,
    id
  } = props;

  const baseClasses = "bg-white rounded-xl shadow-card overflow-hidden transition-shadow duration-200";
  
  const levelClasses = level ? {
    1: "border border-[#c8e6c9] bg-[#e9f5e9]",
    2: "border border-[#ffecb3] bg-[#fff8e1]", 
    3: "border border-[#ffcdd2] bg-[#ffebee]"
  }[level] : "";

  const interactionClasses = clickable ? "cursor-pointer" : "";
  
  const finalClasses = `${baseClasses} ${levelClasses} ${interactionClasses} ${className}`.trim();
  
  const motionConfig = hoverable ? 
    createMotionConfig('cardHover') :
    createMotionConfig('fadeIn');

  const attributes = `
    class="${finalClasses}"
    data-motion='${motionConfig}'
    ${id ? `id="${id}"` : ''}
    ${onClick ? `onclick="${onClick}"` : ''}
  `.trim();

  return `
    <div ${attributes}>
      ${children}
    </div>
  `;
} 