/**
 * Feature flags for the application.
 *
 * HOW TO RE-ENABLE AI FEATURES:
 * 1. Set VITE_AI_ENABLED=true in frontend/.env
 * 2. Make sure OPENAI_API_KEY is set in backend/.env
 * 3. Restart both dev servers
 */

export const features = {
  /**
   * When false, all AI hooks return the demo toast immediately
   * and never make a network request to /api/ai/*.
   * The backend routes and services are fully preserved and unchanged.
   */
  aiEnabled: import.meta.env.VITE_AI_ENABLED === "true",
} as const
