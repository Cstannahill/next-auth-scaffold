'use client';

import Image from 'next/image';
import { IconSize, IconVariant, ICON_SIZES, getIconPath } from '../utils/iconUtils';

interface IconProps {
  size?: IconSize;
  variant?: IconVariant;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function Icon({ 
  size = 'md', 
  variant = 'default', 
  className = '', 
  alt = 'Icon',
  priority = false 
}: IconProps) {
  const sizeValue = ICON_SIZES[size];
  const src = getIconPath(size, variant);
  
  return (
    <Image
      src={src}
      alt={alt}
      width={sizeValue}
      height={sizeValue}
      className={className}
      priority={priority}
    />
  );
}

// Convenience components for common use cases
export function LogoIcon({ size = 'lg', className = '' }: { size?: IconSize; className?: string }) {
  return <Icon size={size} variant="logo" className={className} alt="Logo" />;
}

export function FaviconIcon({ className = '' }: { className?: string }) {
  return <Icon variant="favicon" className={className} alt="Favicon" />;
}
