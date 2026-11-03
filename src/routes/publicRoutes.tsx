import HomePage from "@/features/home/HomePage";
import RestaurantsPage from "@/features/restaurants/RestaurantsPage";
import RestaurantMenuPage from "@/features/restaurants/RestaurantMenuPage";
import ProductDetailsPage from "@/features/restaurants/ProductDetailsPage";
import UiKitPreview from "@/pages/UiKitPreview";

export const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/restaurants", element: <RestaurantsPage /> },
  { path: "/restaurants/:id", element: <RestaurantMenuPage /> },
  { path: "/products/:id", element: <ProductDetailsPage /> },
  { path: "/ui-kit", element: <UiKitPreview /> },
];
