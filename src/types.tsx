export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  deliveryTime: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type OrderStatus = "pending" | "preparing" | "delivered" | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

export interface User {
  name: string;
  role: "customer" | "owner";
}

export interface ApiError {
  error?: {
    message?: string;
  };
}

export interface Address {
  id: string;
  details: string;
  label: string;
  street: string;
  city: string;
  postalCode?: string;
}
