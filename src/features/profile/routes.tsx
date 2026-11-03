import type { RouteObject } from "react-router";
import ProfilePage from "@/features/profile/ProfilePage";
import AddressesPage from "@/features/profile/AddressesPage";

// any logged-in user (customer or owner)
export const profileRoutes: RouteObject[] = [
  { path: "/profile", element: <ProfilePage /> },
];

// customers only
export const customerProfileRoutes: RouteObject[] = [
  { path: "/addresses", element: <AddressesPage /> },
];
