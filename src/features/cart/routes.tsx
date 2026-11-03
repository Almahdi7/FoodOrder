import type { RouteObject } from "react-router";
import PlaceholderPage from "@/components/PlaceholderPage";
import Cart from "@/features/cart/Cart";
import Checkout from "@/features/cart/Checkout";

// anyone can view the cart
export const cartPublicRoutes: RouteObject[] = [
  { path: "/cart", element: <Cart /> },
];

// customers only
export const cartRoutes: RouteObject[] = [
  { path: "/checkout", element: <Checkout /> },
  {
    path: "/orders",
    element: <PlaceholderPage title="My Orders" owner="L" />,
  },
  {
    path: "/orders/:id",
    element: <PlaceholderPage title="Order Details" owner="L" />,
  },
];
