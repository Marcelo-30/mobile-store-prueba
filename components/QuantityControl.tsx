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

            <Pressable style={[styles.button, quantity === 0 && styles.disabledButton]} onPress={handleDecrement} disabled={quantity===0}>
            <Text style={styles.buttonText}>-</Text>
        </Pressable>

            <Text>Cantidad: {quantity}</Text>

            <Pressable style={styles.button} onPress={handleIncrement}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 16,
    },
    button: {
        backgroundColor: "#2563eb",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#9ca3af",
    },
});
