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
  customerName: string;
  createdAt: string; // ISO date, e.g. "2026-11-03T11:54:00.000Z"
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
  id: string | number;
  details: string;
  label: string;
  street: string;
  city: string;
  postalCode?: string;
}
