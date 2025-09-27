/**
 * Icon utility functions for the bfox2 iconset
 */

export type IconSize = 
  | 'xs'    // 16x16
  | 'sm'    // 24x24
  | 'md'    // 32x32
  | 'lg'    // 48x48
  | 'xl'    // 64x64
  | '2xl'   // 96x96
  | '3xl'   // 128x128
  | '4xl'   // 256x256
  | '5xl'   // 512x512
  | '6xl';  // 1024x1024

export type IconVariant = 'default' | 'logo' | 'favicon';

/**
 * Map of icon sizes to pixel dimensions
 */
export const ICON_SIZES: Record<IconSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  '2xl': 96,
  '3xl': 128,
  '4xl': 256,
  '5xl': 512,
  '6xl': 1024,
};

/**
 * Get the appropriate icon path based on size and variant
 */
export function getIconPath(size: IconSize, variant: IconVariant = 'default'): string {
  const sizeValue = ICON_SIZES[size];
  
  switch (variant) {
    case 'logo':
      return '/assets/bfox2/icon.png';
    case 'favicon':
      return '/assets/bfox2/icon.ico';
    default:
      return `/assets/bfox2/${sizeValue}x${sizeValue}.png`;
  }
}

/**
 * Get all available icon sizes
 */
export function getAllIconSizes(): IconSize[] {
  return Object.keys(ICON_SIZES) as IconSize[];
}

/**
 * Get icon size by pixel dimension
 */
export function getIconSizeByPixels(pixels: number): IconSize | null {
  const entry = Object.entries(ICON_SIZES).find(([_, size]) => size === pixels);
  return entry ? (entry[0] as IconSize) : null;
}

/**
 * Check if a size is valid for the iconset
 */
export function isValidIconSize(size: string): size is IconSize {
  return size in ICON_SIZES;
}

/**
 * Common icon size presets for different use cases
 */
export const ICON_PRESETS = {
  // Navigation and UI elements
  navbar: 'sm' as IconSize,
  button: 'xs' as IconSize,
  menu: 'md' as IconSize,
  
  // Content and branding
  logo: 'lg' as IconSize,
  hero: '4xl' as IconSize,
  card: '2xl' as IconSize,
  
  // Footer and small elements
  footer: 'xs' as IconSize,
  social: 'md' as IconSize,
  
  // Forms and inputs
  input: 'sm' as IconSize,
  label: 'xs' as IconSize,
} as const;

/**
 * Get recommended icon size for a specific use case
 */
export function getRecommendedSize(useCase: keyof typeof ICON_PRESETS): IconSize {
  return ICON_PRESETS[useCase];
}
