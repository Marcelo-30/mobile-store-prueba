import { useQuery } from "@tanstack/react-query";

import { fetchProductById } from "../services/productsApi";

export function useProduct(id: string) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => fetchProductById(id),
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
}