import type { CartItemData } from "./CartTypes";

export const mockCartItems: CartItemData[] = [
  {
    productId: 1,
    restaurantId: "restaurant-1",
    name: "Chicken Burger",
    price: 8.5,
    image: "",
    quantity: 2,
  },
  {
    productId: 2,
    restaurantId: "restaurant-1",
    name: "Pizza",
    price: 12,
    image: "",
    quantity: 1,
  },
];