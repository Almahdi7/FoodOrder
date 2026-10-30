import { useEffect, useState } from 'react'
import type { Product } from '../types/Product'
import { getProducts } from '../api/productService';

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const res = await getProducts();
        setProducts(res.data);

      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false)
      }
    };
  fetchProducts();
  }, []);

  return (
    {products, loading, error}
  )
}

export default useProducts
