import {Pressable, StyleSheet, Text, View} from "react-native";
import { useCartStore} from "../store/cartStore";

type QuantityControlProps={
    productId:number;
};

export default function QuantityControl({productId}: QuantityControlProps){
    const quantity=useCartStore(function selectQuantity(state){
        return state.items[productId] ?? 0;
        });

    const increment= useCartStore(function selectIncrement(state){
        return state.increment;
    });

    const decrement = useCartStore(function selectDecrement(state){
        return state.decrement;
    });

    function handleIncrement(){
        increment(productId);
    }

    function handleDecrement(){
        decrement(productId);
    }

    return(
        <View style={styles.container}>

            <Pressable style={[styles.button, quantity === 0 && styles.disabledButton]} onPress={handleDecrement} disabled={quantity===0}
            accessibilityRole="button"
            accessibilityLabel="Disminuir cantidad"
            >
            <Text style={styles.buttonText}>-</Text>
        </Pressable>

            <Text style={styles.quantity}>{quantity}</Text>

            <Pressable style={styles.button} onPress={handleIncrement}
            accessibilityRole="button"
            accessibilityLabel="Aumentar cantidad"
            >
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        marginTop: 12,
    },
    button: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#2563eb",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
    },
    quantity: {
        minWidth: 28,
        color: "#111827",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    disabledButton: {
        backgroundColor: "#9ca3af",
    },
});
