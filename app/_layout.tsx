import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout(){
  return (
      <QueryClientProvider client={queryClient}>
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
                />
            <Stack.Screen
                name="catalog"
                options={{
                    title:"Catálogo",
                }}
                />
            <Stack.Screen
                name="product/[id]"
                options={{
                    title:"Detalles del producto",
                }}
                />
            <Stack.Screen
                name="cart"
                options={{
                    title: "Carrito",
                }}
            />
            <Stack.Screen
                name="checkout"
                options={{
                    title: "Finalizar compra",
                }}
            />
            <Stack.Screen
                name="success"
                options={{
                    title: "Compra confirmada",
                }}
            />
        </Stack>
      </QueryClientProvider>
  );
}
