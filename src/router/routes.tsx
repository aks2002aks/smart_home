import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "../provider/authContext";
import Dashboard from "../components/dashboard/dashboard";
import ProtectedRoute from "./protectedRoute";
import Home from "../components/home/home";
import Login from "../components/login/login";
import Signup from "../components/signup/signup";

const Routes = () => {
  const { isAuthenticated } = useAuth();

  // Public routes
  const routesForPublic = [
    {
      path: "/",
      element: <Home />, // Assuming Home is the main page
    },
    {
      path: "/login",
      element: (
        <>
          {isAuthenticated ? (
            <Navigate to="/" replace /> // Redirect home if already authenticated
          ) : (
            <Login /> // Render login with login function callback
          )}
        </>
      ),
    },
    // {
    //   path: "/signup",
    //   element: (
    //     <>
    //       {isAuthenticated ? (
    //         <Navigate to="/" replace /> // Redirect home if already authenticated
    //       ) : (
    //         <Signup /> // Render signup with signup function callback
    //       )}
    //     </>
    //   ),
    // },
  ];

  // Protected routes (accessible only when authenticated)
  const routesForAuthenticated = [
    {
      path: "/",
      element: <ProtectedRoute />, // Ensure ProtectedRoute checks authentication
      children: [
        // Add child routes for protected pages here
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticated, // Include protected routes after public ones
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
