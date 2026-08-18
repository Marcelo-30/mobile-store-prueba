import type { Product } from "../types/Product";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

export async function fetchProducts(): Promise<Product[]>{
    const response = await fetch(PRODUCTS_URL);

    if(!response.ok){
        throw new Error("No se pudieron cargar los productos");
    }

    const products:Product[]= await response.json();

    return products;
}

export async function fetchProductById(
    id: string,
): Promise<Product>{
    const response = await
        fetch(`${PRODUCTS_URL}/${id}`);

    if(!response.ok){
        throw new Error ("No se pudo cargar el producto");
    }
    const product: Product = await response.json();

    return product;
}
