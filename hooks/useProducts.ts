import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productsApi"

export function useProducts(){
    return useQuery({
        queryKey:["products"],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
}