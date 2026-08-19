import { StyleSheet, Text, View } from "react-native";
import { useCartStore } from "../store/cartStore";
import { Product } from "../types/Product";
import QuantityControl from "./QuantityControl";

type CartItemProps = {
    product: Product;
};

export default function CartItem({product}: CartItemProps){
    const quantity= useCartStore(function selectQuantity(state){
        return state.items[product.id] ?? 0;
    });

    const subtotal = product.price * quantity;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.title}</Text>

            <Text>Precio unitario: ${product.price.toFixed(2)}</Text>

            <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>

            <QuantityControl productId={product.id}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    title: {
        marginBottom: 8,
        fontSize: 17,
        fontWeight: "bold",
    },
    subtotal: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb",
    },
});