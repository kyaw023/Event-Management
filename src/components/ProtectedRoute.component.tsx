import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  redirectTo: string;
  loading: boolean;
}
const ProtectedRouteComponent: React.FC<Props> = ({
  children,
  redirectTo,
  loading,
}: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const toastShown = useRef(false); // Set ref to false initially

  useEffect(() => {
    // Show toast only if user is logged in and we are not in a loading state
    if (
      user &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      if (!toastShown.current && !loading) {
        toast.error("You are already logged in!");
        toastShown.current = true; // Mark as shown to prevent duplicate toasts
      }
    } else {
      toastShown.current = false; // Reset if not on login/register page
    }
  }, [user, location.pathname, loading]);

  if (
    user &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to={redirectTo} />;
  }
  return <>{children}</>;
};

export default ProtectedRouteComponent;
