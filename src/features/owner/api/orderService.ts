import type { Order } from "@/types";
import axios from "axios";

export const orderAPI = axios.create({
    baseURL: "http://localhost:3000/orders",
    timeout: 10000,
    headers: {"Content-Type": "application/json"}
});

export const getOrders = () => orderAPI.get<Order[]>('/');
export const addOrder = (order: Order) => orderAPI.post<Order>('/', order);
export const updateOrder = (id : number, status: Order['status']) => orderAPI.patch<Order>(`/${id}`, {status});
export const deleteOrder = (id : number) => orderAPI.delete(`/${id}`);