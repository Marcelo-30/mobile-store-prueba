import {Link} from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SuccessScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.icon}>✓</Text>

            <Text style={styles.title}>¡Compra confirmada!</Text>

            <Text style={styles.message}>Tu pedido fue registrado correctamente.</Text>

            <Link href="/catalog" dismissTo asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Volver al catálogo</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f7f7f7",
    },
    icon: {
        fontSize: 72,
        color: "#16a34a",
    },
    title: {
        marginTop: 16,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    message: {
        marginTop: 12,
        fontSize: 16,
        color: "#4b5563",
        textAlign: "center",
    },
    button: {
        marginTop: 32,
        borderRadius: 8,
        backgroundColor: "#2563eb",
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});