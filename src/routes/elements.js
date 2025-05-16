import { Suspense, lazy } from "react";
// components
import { LoadingScreen } from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(
  lazy(() => import("../pages/auth/LoginPage"))
);
export const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/RegisterPage"))
);

// Main
export const HomePage = Loadable(lazy(() => import("../pages/HomePage")));

// Dashboard
export const DashboardPage = Loadable(
  lazy(() => import("../pages/dashboard/Dashboard"))
);
export const ShippingRateCalculatorPage = Loadable(
  lazy(() => import("../pages/dashboard/ShippingRateCalculator"))
);

export const ShippingPage = Loadable(
  lazy(() => import("../pages/dashboard/Shipping"))
);

export const ReportPage = Loadable(
  lazy(() => import("../pages/dashboard/Report"))
);

export const SettingPage = Loadable(
  lazy(() => import("../pages/dashboard/Setting"))
);
