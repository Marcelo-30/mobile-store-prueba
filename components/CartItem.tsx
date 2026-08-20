import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useCartStore } from "../store/cartStore";
import { Product } from "../types/Product";
import QuantityControl from "./QuantityControl";
import {Link} from "expo-router";

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
            <Link
                href={{
                    pathname: "/product/[id]",
                    params: {
                        id: product.id.toString(),
                    },
                }}
                asChild
            >
                <Pressable style={styles.productInfo}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.image}
                            resizeMode="contain"
                            accessibilityLabel={product.title}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>

                        <Text style={styles.unitPrice}>Precio: ${product.price.toFixed(2)}</Text>

                        <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
                    </View>
                </Pressable>
            </Link>

            <View style={styles.quantityContainer}>
                <QuantityControl productId={product.id} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        backgroundColor: "#ffffff",
        padding: 14,
        elevation: 2,
    },
    productInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageContainer: {
        width: 92,
        height: 92,
        marginRight: 12,
        borderRadius: 12,
        backgroundColor: "#f9fafb",
        padding: 8,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        color: "#111827",
    },
    unitPrice: {
        marginTop: 6,
        fontSize: 14,
        color: "#6b7280",
    },
    subtotal: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb",
    },
    quantityContainer: {
        width: 180,
        alignSelf: "center",
    },
});