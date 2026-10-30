import { createContext } from "react";
import type { CartItemData } from "./CartTypes";

export interface CartContextType {
  items: CartItemData[];
  addToCart: (item: CartItemData) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext =
  createContext<CartContextType | undefined>(undefined);