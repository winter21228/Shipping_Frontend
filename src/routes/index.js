import { useCallback, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  HomePage,
  // Auth
  LoginPage,
  RegisterPage,
  ReportPage,
  SettingPage,
  ShippingPage,
  ShippingRateCalculatorPage,
} from "./elements";

import { initializeSuccess } from "../redux/slices/auth";

import GuestGuard from "../auth/GuestGuard";
import AuthGuard from "../auth/AuthGuard";

import LoginLayout from "../layouts/LoginLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

import localStorageAvailable from "../utils/localStorageAvailable";
import { isValidToken, setSession } from "../utils/session";
import axios from "../utils/axios";

import { PATH_AFTER_LOGIN } from "../config-global";

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useDispatch();
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get("/api/auth/my-account");

        const user = response.data.msg;
        dispatch(
          initializeSuccess({
            isAuthenticated: true,
            user,
          })
        );
      } else {
        dispatch(
          initializeSuccess({
            isAuthenticated: false,
            user: null,
          })
        );
      }
    } catch (error) {
      dispatch(
        initializeSuccess({
          isAuthenticated: false,
          user: null,
        })
      );
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return useRoutes([
    {
      path: "/",
      element: (
        <LoginLayout>
          <HomePage />
        </LoginLayout>
      ),
    },
    // Auth
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: "ship",
          element: <ShippingPage />,
        },
        {
          path: "rates",
          element: <ShippingRateCalculatorPage />,
        },
        {
          path: "reports",
          element: <ReportPage />,
        },
        {
          path: "settings",
          element: <SettingPage />,
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
