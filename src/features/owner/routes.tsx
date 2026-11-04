import PlaceholderPage from "@/components/PlaceholderPage";
import ManageCategories from "./pages/ManageCategories";
import ManageProducts from "./pages/ManageProducts";

export const ownerRoutes = [
  {
    path: "/owner",
    element: <PlaceholderPage title="Owner Dashboard" owner="R" />,
  },
  {
    path: "/owner/restaurant",
    element: <PlaceholderPage title="Restaurant Profile" owner="R" />,
  },
  { path: "/owner/products", element: <ManageProducts /> },
  { path: "/owner/categories", element: <ManageCategories /> },
  {
    path: "/owner/orders",
    element: <PlaceholderPage title="Manage Orders" owner="R" />,
  },
];
