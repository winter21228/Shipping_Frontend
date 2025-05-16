import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
// routes
import { PATH_DASHBOARD } from "../routes/paths";
// components
import { LoadingScreen } from "../components/loading-screen";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../utils/session";
import { useEffect } from "react";
import { loginSuccess } from "../redux/slices/auth";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("token")) {
      setSession(searchParams.get("token"));
      dispatch(loginSuccess());
    }
  }, [location.search]);

  const { isAuthenticated, isInitialized } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
