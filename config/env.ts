/**
 * Environment configuration
 * Centralized type-safe access to environment variables
 */

export const env = {
  /**
   * Node environment
   */
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  /**
   * Application URLs
   */
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  /**
   * Feature flags
   */
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  enableDebug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true",
} as const;

/**
 * Validate required environment variables
 */
export function validateEnv(): void {
  const required: (keyof typeof env)[] = [];

  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
