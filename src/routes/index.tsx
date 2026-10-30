import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PlaceholderPage from "@/components/PlaceholderPage";
import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";
import UiKitPreview from "@/pages/UiKitPreview";
import RestaurantsPage from "@/features/restaurants/RestaurantsPage";
import AddressesPage from "@/features/profile/AddressesPage";
import RestaurantMenuPage from "@/features/restaurants/RestaurantMenuPage";
import ProductDetailsPage from "@/features/restaurants/ProductDetailsPage";
// Each member replaces ONLY the lines marked with their letter.
const ph = (title: string, owner: string) => (
  <PlaceholderPage title={title} owner={owner} />
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // ---------- Public ----------
      { path: "/", element: ph("Home", "N") }, // N
      { path: "/restaurants", element: <RestaurantsPage /> }, // N
      { path: "/restaurants/:id", element: <RestaurantMenuPage /> }, // N
      { path: "/products/:id", element: <ProductDetailsPage /> }, // N
      { path: "/ui-kit", element: <UiKitPreview /> }, // N
      { path: "/login", element: <LoginPage /> }, // M
      { path: "/register", element: <RegisterPage /> }, // M
      { path: "/cart", element: ph("Cart", "L") }, // L

      // ---------- Customer only ----------
      {
        element: <ProtectedRoute allowedRoles={["customer"]} />,
        children: [
          { path: "/checkout", element: ph("Checkout", "L") }, // L
          { path: "/orders", element: ph("My Orders", "L") }, // L
          { path: "/orders/:id", element: ph("Order Details", "L") }, // L
          { path: "/profile", element: ph("Profile", "M") }, // M
          { path: "/addresses", element: <AddressesPage /> },
        ],
      },

      // ---------- Restaurant owner only ----------
      {
        element: <ProtectedRoute allowedRoles={["owner"]} />,
        children: [
          { path: "/owner", element: ph("Owner Dashboard", "R") }, // R
          { path: "/owner/restaurant", element: ph("Restaurant Profile", "R") }, // R
          { path: "/owner/products", element: ph("Manage Products", "R") }, // R
          { path: "/owner/categories", element: ph("Manage Categories", "R") }, // R
          { path: "/owner/orders", element: ph("Manage Orders", "R") }, // R
        ],
      },

      { path: "*", element: ph("404 Not Found", "M") }, // M
    ],
  },
]);
