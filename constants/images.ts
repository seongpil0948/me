/**
 * Image-related constants for the application
 */

/**
 * Hero section animation configuration
 */
export const HERO_FRAME_COUNT = 15;

export const HERO_IMAGE_URLS = Array.from(
  { length: HERO_FRAME_COUNT },
  (_, i) => `/me/moong-me/${i + 1}.png`,
);

/**
 * Image optimization defaults
 */
export const IMAGE_QUALITY = {
  HIGH: 90,
  MEDIUM: 75,
  LOW: 60,
} as const;

/**
 * Common image sizes
 */
export const IMAGE_SIZES = {
  THUMBNAIL: 150,
  SMALL: 300,
  MEDIUM: 600,
  LARGE: 1200,
  XLARGE: 2400,
} as const;
