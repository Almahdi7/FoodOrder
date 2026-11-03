import PlaceholderPage from "@/components/PlaceholderPage";
import Cart from "./Cart";
import Checkout from "./Checkout";

export const cartRoutes = [
  { path: "/cart", element: <Cart /> },
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
