import axios from "axios"
import type { Category } from "../types/Category"

export const categoryAPI = axios.create({
    baseURL: "http://localhost:3000/categories",
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
})

export const getCategories = () => categoryAPI.get<Category[]>('/');
export const addCategory = (category: Category) => categoryAPI.post<Category>('/', category);
export const updateCategory = (id: number, category: Category) => categoryAPI.put<Category>(`/${id}`, category);
export const deleteCategory = (id: number) => categoryAPI.delete(`/${id}`);
