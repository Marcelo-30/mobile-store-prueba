import {Pressable, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, View} from "react-native";
import {useState} from "react";
import {useProducts} from "../hooks/useProducts";
import {router} from "expo-router";
import {useCartStore} from "@/store/cartStore";

export default function CheckoutScreen (){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const clearCart = useCartStore(function selectClearCart(state) {
        return state.clearCart;
    });


    const productsQuery = useProducts();

    const items = useCartStore(function selectItems(state) {
        return state.items;
    });

    if (productsQuery.isPending) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando pedido...</Text>
            </View>
        );
    }

    if (productsQuery.isError) {
        return (
            <View style={styles.loadingContainer}>
                <Text>{productsQuery.error.message}</Text>
            </View>
        );
    }

    const orderProducts = productsQuery.data.filter(
        function isProductInOrder(product) {
            return (items[product.id] ?? 0) > 0;
        },
    );

    const total = orderProducts.reduce(
        function calculateOrderTotal(currentTotal, product) {
            const quantity = items[product.id] ?? 0;
            const subtotal = product.price * quantity;

            return currentTotal + subtotal;
        },
        0,
    );

    function handleExpirationDateChange(value: string) {
        const digits = value.replace(/\D/g, "").slice(0, 4);

        if (digits.length > 2) {
            const formattedDate =
                digits.slice(0, 2) + "/" + digits.slice(2);

            setExpirationDate(formattedDate);
            return;
        }

        setExpirationDate(digits);
    }

    function handleConfirmPurchase(){
        const hasEmptyFields =
            name.trim() === "" ||
            email.trim() === "" ||
            address.trim() === "" ||
            cardNumber.trim() === "" ||
            expirationDate.trim() === "" ||
            cvv.trim() === "";


        if (hasEmptyFields){
            setErrorMessage("Completa todos los campos.")
            return;
        }

        if (!email.includes("@")){
            setErrorMessage("Escribe un correo válido.")
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            setErrorMessage("El número de tarjeta debe tener 16 dígitos.");
            return;
        }

        //Validar Fecha de vencimieto

        if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
            setErrorMessage("Escribe la fecha de vencimiento en formato MM/AA.");
            return;
        }

        const expirationMonth = Number(expirationDate.slice(0, 2));
        const expirationYear = Number("20" + expirationDate.slice(3, 5));

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const isExpired =
            expirationYear < currentYear ||
            (expirationYear === currentYear &&
                expirationMonth < currentMonth);

        if (
            expirationMonth < 1 ||
            expirationMonth > 12 ||
            isExpired
        ) {
            setErrorMessage("La fecha de vencimiento no es válida.");
            return;
        }

        // Validar CVV

        if (!/^\d{3}$/.test(cvv)) {
            setErrorMessage("El CVV debe tener 3 dígitos.");
            return;
        }


        setErrorMessage("");
        clearCart();
        router.replace("/success");
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
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

            <View style={styles.paymentContainer}>
                <Text style={styles.sectionTitle}>Datos de pago</Text>

                <Text style={styles.paymentNote}>
                    Pago simulado (Mock).
                </Text>

                <Text style={styles.label}>Número de tarjeta</Text>
                <TextInput
                    style={styles.input}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    placeholder="1234567812345678"
                    keyboardType="number-pad"
                    autoComplete="cc-number"
                    maxLength={16}
                />

                <View style={styles.paymentRow}>
                    <View style={styles.paymentField}>
                        <Text style={styles.label}>Vencimiento</Text>
                        <TextInput
                            style={styles.input}
                            value={expirationDate}
                            onChangeText={handleExpirationDateChange}
                            placeholder="MM/AA"
                            keyboardType="number-pad"
                            autoComplete="cc-exp"
                            maxLength={5}
                        />
                    </View>

                    <View style={styles.paymentField}>
                        <Text style={styles.label}>CVV</Text>
                        <TextInput
                            style={styles.input}
                            value={cvv}
                            onChangeText={setCvv}
                            placeholder="123"
                            keyboardType="number-pad"
                            autoComplete="cc-csc"
                            maxLength={3}
                            secureTextEntry
                        />
                    </View>
                </View>
            </View>

            <View style={styles.summaryContainer}>
                <Text style={styles.sectionTitle}>Resumen del pedido</Text>

                {orderProducts.map(function renderOrderProduct(product) {
                    const quantity = items[product.id] ?? 0;
                    const subtotal = product.price * quantity;

                    return (
                        <View key={product.id} style={styles.summaryRow}>
                            <Text style={styles.summaryProduct} numberOfLines={2}>
                                {product.title} × {quantity}
                            </Text>

                            <Text style={styles.summaryPrice}>
                                ${subtotal.toFixed(2)}
                            </Text>
                        </View>
                    );
                })}

                <View style={styles.summaryTotalRow}>
                    <Text style={styles.summaryTotalLabel}>Total</Text>
                    <Text style={styles.summaryTotal}>
                        ${total.toFixed(2)}
                    </Text>
                </View>
            </View>



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
        paddingBottom:64,
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
    },
    summaryContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    sectionTitle: {
        marginBottom: 14,
        fontSize: 20,
        fontWeight: "bold",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 10,
    },
    summaryProduct: {
        flex: 1,
        fontSize: 14,
        color: "#374151",
    },
    summaryPrice: {
        fontSize: 14,
        fontWeight: "600",
    },
    summaryTotalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },
    summaryTotalLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    summaryTotal: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2563eb",
    },
    paymentContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    paymentNote: {
        color: "#6b7280",
        fontSize: 13,
    },
    paymentRow: {
        flexDirection: "row",
        gap: 12,
    },
    paymentField: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
});