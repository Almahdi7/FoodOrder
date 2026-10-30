import axios from "axios";
import type { Product } from "../types/Product";

export const productsAPI = axios.create({
    baseURL: "http://localhost:3000/products",
    timeout: 10000,
    headers: {"Content-Type": "application/json"}
});

export const getProducts = () => productsAPI.get<Product[]>('/');
export const addProduct = (product: Product) => productsAPI.post<Product>('/', product);
export const updateProduct = (id : number, product: Product) => productsAPI.put<Product>(`/${id}`, product);
export const deleteProduct = (id : number) => productsAPI.delete(`/${id}`);