
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItemData } from "./CartTypes";
import { mockCartItems } from "./mockCartItems";
import { CartContext } from "./CartContext";

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({
  children,
}: CartProviderProps) {


  const [items, setItems] = useState<CartItemData[]>(() => {
    try {
      const savedCart = localStorage.getItem("foodorder_cart");

      if (savedCart !== null) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          return parsed as CartItemData[];
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }

    return mockCartItems;
  });

  useEffect(() => {
    localStorage.setItem(
      "foodorder_cart",
      JSON.stringify(items)
    );
  }, [items]);


  const clearCart = () => {
    setItems([]);
  };



  const addToCart = (newItem: CartItemData) => {
    const differentRestaurant = items.some(
      (item) => item.restaurantId !== newItem.restaurantId
    );

    if (differentRestaurant) {
      const confirmed = window.confirm(
        "Your cart contains items from another restaurant. Clear the current cart and add this item?"
      );

      if (!confirmed) return;

      setItems([newItem]);
      return;
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === newItem.productId
            ? {
              ...item,
              quantity: item.quantity + newItem.quantity,
            }
            : item
        );
      }

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => {
      return prevItems.filter(
        (item) => item.productId !== productId
      );
    });
  };


  const updateQuantity = (productId: number, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantity,
          };
        }

        return item;
      });
    });
  };




  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );

}
