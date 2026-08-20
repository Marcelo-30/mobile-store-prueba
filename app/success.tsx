import {Link, useLocalSearchParams} from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SuccessScreen(){

    const {total, orderNumber} = useLocalSearchParams<{
        total?: string;
        orderNumber?: string;
    }>();

    return(
        <View style={styles.container}>
            <Text style={styles.icon}>✓</Text>

            <Text style={styles.title}>¡Compra confirmada!</Text>

            <Text style={styles.message}>Tu pedido fue registrado correctamente.</Text>

            <View style={styles.detailsCard}>
                <Text style={styles.detailLabel}>Número de compra</Text>

                <Text style={styles.orderNumber}>
                    {orderNumber ?? "No disponible"}
                </Text>

                <View style={styles.divider}/>

                <Text style={styles.detailLabel}>Total pagado</Text>

                <Text style={styles.paidTotal}>
                    ${total ?? "0.00"}
                </Text>
            </View>

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
    detailsCard: {
        width: "100%",
        maxWidth: 360,
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        backgroundColor: "#ffffff",
        padding: 20,
    },
    detailLabel: {
        color: "#6b7280",
        fontSize: 14,
        textAlign: "center",
    },
    orderNumber: {
        marginTop: 6,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    divider: {
        height: 1,
        marginVertical: 16,
        backgroundColor: "#e5e7eb",
    },
    paidTotal: {
        marginTop: 6,
        color: "#16a34a",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
});