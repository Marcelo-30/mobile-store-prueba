import {Pressable, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import {useState} from "react";
import {router} from "expo-router";
import {useCartStore} from "@/store/cartStore";

export default function CheckoutScreen (){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const clearCart = useCartStore(function selectClearCart(state) {
        return state.clearCart;
    });

    function handleConfirmPurchase(){
        const hasEmptyFields =
            name.trim() === "" ||
            email.trim() === "" ||
            address.trim() === "";

        if (hasEmptyFields){
            setErrorMessage("Completa todos los campos.")
            return;
        }

        if (!email.includes("@")){
            setErrorMessage("Escribe un correo válido.")
            return;
        }
        setErrorMessage("");
        clearCart();
        router.replace("/success");
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Finalizar compra</Text>
            <Text>Completa tus datos para confirmar el pedido.</Text>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Escribe tu nombre"
                autoComplete="name"
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={styles.label}>Dirección de entrega</Text>

            <TextInput
                style={[styles.input, styles.addressInput]}
                value={address}
                onChangeText={setAddress}
                placeholder="Escribe tu dirección"
                autoComplete="street-address"
                multiline
                numberOfLines={3}
            />

            {errorMessage !== "" && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}


            <Pressable style={styles.confirmButton} onPress={handleConfirmPurchase}>
                <Text style={styles.confirmButtonText}>Confirmar compra</Text>
            </Pressable>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: "#f7f7f7",
    },
    title: {
        marginBottom: 16,
        fontSize: 28,
        fontWeight: "bold",
    },
    label: {
        marginTop: 20,
        marginBottom: 8,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 8,
        backgroundColor: "#ffffff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    addressInput: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    errorText: {
        marginTop: 12,
        color: "#dc2626",
        fontWeight: "bold",
    },
    confirmButton: {
        marginTop: 24,
        borderRadius: 8,
        backgroundColor: "#16a34a",
        padding: 14,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    keyboardContainer: {
        flex: 1,
        backgroundColor: "#f7f7f7",
    },
});