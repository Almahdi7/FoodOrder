import { useEffect, useState } from 'react'
import type { Category } from '../types/Category';
import { getCategories } from '../api/catrgoryService';

const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const res = await getCategories();
                setCategories(res.data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

  return (
    {categories, loading, error}
  )
}

export default useCategories
