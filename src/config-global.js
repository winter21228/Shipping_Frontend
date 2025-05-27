import { PATH_DASHBOARD } from "./routes/paths";

// API
export const HOST_API_KEY = process.env.REACT_APP_HOST_API_KEY || "";
export const STRIPE_PUBLISHABLE_KEY =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "";

export const PATH_AFTER_LOGIN = PATH_DASHBOARD.ship;
