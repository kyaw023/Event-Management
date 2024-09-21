import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  EventDetailPage,
  EventFormPage,
  EventRegisterPage,
  HomePage,
  LoginPage,
  MyEventsPage,
  RegisterPage,
} from "../pages";
import { LayoutComponent, ProtectedRouteComponent } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "../store/store";
import { useLogoutMutation } from "../store/endpoints/authEndpoints";
import { logout } from "../store/slice/auth/auth.slice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const IndexRoutes = () => {
  const { user, error, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();
  const [logoutFun] = useLogoutMutation();

  useEffect(() => {
    if (error) {
      const handleLogout = async () => {
        try {
          await logoutFun().unwrap();
        } catch (logoutError) {
          console.log(logoutError);
          toast.error("Something went wrong");
        } finally {
          dispatch(logout());
          persistor.purge();
          <Navigate to={"/login"} />;
        }
      };

      handleLogout();
    }
  }, [error, logoutFun, dispatch, persistor]);
  const Routers = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/event/:id",
          element: <EventDetailPage />,
        },
        {
          path: "/event/register/:id",
          element: user ? <EventRegisterPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/create-event",
          element: user ? <EventFormPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/edit-event/:id",
          element: user ? <EventFormPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/my-events",
          element: user ? <MyEventsPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/login",
          element: !user ? (
            <LoginPage />
          ) : (
            <ProtectedRouteComponent redirectTo="/" loading={isLoading}>
              <LoginPage />
            </ProtectedRouteComponent>
          ),
        },
        {
          path: "/register",
          element: !user ? (
            <RegisterPage />
          ) : (
            <ProtectedRouteComponent redirectTo="/" loading={isLoading}>
              <RegisterPage />
            </ProtectedRouteComponent>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={Routers} />;
};

export default IndexRoutes;
