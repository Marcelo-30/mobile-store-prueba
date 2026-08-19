import {FlatList, StyleSheet, Text, View } from "react-native";
import {useCartStore} from "../store/cartStore";
import {useProducts} from "../hooks/useProducts";
import CartItem from "../components/CartItem";

export default function CartScreen(){
    const productsQuery= useProducts();

    const items = useCartStore(function selectItems(state){
        return state.items;
    });

    if (productsQuery.isPending){
        return(
            <View style={styles.container}>
                <Text>Cargando carrito...</Text>
            </View>
        );
    }

    if(productsQuery.isError){
        return(
            <View style={styles.container}>
                <Text>{productsQuery.error.message}</Text>
            </View>
        );
    }

    const cartProducts = productsQuery.data.filter(
        function isProductInCart(product){
            return (items[product.id] ?? 0) > 0;
        },
    );

    const total = cartProducts.reduce(
        function calculateTotal(currentTotal, product){
            const quantity = items[product.id] ?? 0;
            const subtotal= product.price * quantity;

            return currentTotal + subtotal;
        },
        0,
    );

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mi carrito</Text>

            <FlatList style={styles.list} data={cartProducts} keyExtractor={function extractProductKey(product){
                return product.id.toString();
            }}
                      renderItem={function renderCartProduct({item}){
                          return <CartItem product={item}/>;
                      }}

                      ListEmptyComponent={
                <Text>Tu carrito está vacío.</Text>
                      }
                      />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                    Total: ${total.toFixed(2)}
                </Text>
            </View>

        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:"#f7f7f7"
    },
    title: {
        marginBottom: 16,
        fontSize: 28,
        fontWeight: "bold",
    },
    list: {
        flex: 1,
    },
    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        paddingTop: 16,
    },
    totalText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "right",
    },
});