import { useEffect, useState } from "react"
import { getOrders } from "../api/orderService";
import type { Order } from "@/types";

export const useOrders = () => {
    const [ orders, setOrders ] = useState<Order[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const res = await getOrders();
                setOrders(res.data)
            }catch(err){
                setError(err instanceof Error ? err.message : String(err))
            }finally{
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);
    return{orders,setOrders, loading, error};
}