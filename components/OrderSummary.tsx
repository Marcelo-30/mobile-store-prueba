import {StyleSheet, Text, View} from "react-native";
import type {Product} from "@/types/Product";

type OrderSummaryProps = {
    orderProducts: Product[];
    items: Record<number, number>;
    total: number;
};

export default function OrderSummary({orderProducts, items, total}: OrderSummaryProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumen del pedido</Text>

            {orderProducts.map(function renderOrderProduct(product) {
                const quantity = items[product.id] ?? 0;
                const subtotal = product.price * quantity;

                return (
                    <View key={product.id} style={styles.row}>
                        <Text style={styles.product} numberOfLines={2}>
                            {product.title} × {quantity}
                        </Text>

                        <Text style={styles.price}>
                            ${subtotal.toFixed(2)}
                        </Text>
                    </View>
                );
            })}

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>

                <Text style={styles.total}>
                    ${total.toFixed(2)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    title: {
        marginBottom: 14,
        fontSize: 20,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 10,
    },
    product: {
        flex: 1,
        fontSize: 14,
        color: "#374151",
    },
    price: {
        fontSize: 14,
        fontWeight: "600",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2563eb",
    },
});