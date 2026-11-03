import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@/pages/NotFoundPage";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "@/features/auth/routes";
import { profileRoutes } from "@/features/profile/routes";
import { cartRoutes } from "@/features/cart/routes";
import { ownerRoutes } from "@/features/owner/routes";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      ...publicRoutes,
      ...authRoutes,
      {
        element: <ProtectedRoute />,
        children: profileRoutes,
      },
      {
        element: <ProtectedRoute allowedRoles={["customer"]} />,
        children: cartRoutes,
      },
      {
        element: <ProtectedRoute allowedRoles={["owner"]} />,
        children: ownerRoutes,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
