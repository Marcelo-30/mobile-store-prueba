import { Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import {Link} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCartStore } from "../store/cartStore";

export default function Catalog() {
    const productsQuery = useProducts();

    const items = useCartStore(function selectItems(state) {
        return state.items;
    });

    const totalItems = Object.values(items).reduce(
        function calculateTotalItems(total, quantity) {
            return total + quantity;
        },
        0,
    );

    if (productsQuery.isPending){
        return (
            <View style={styles.container}>
                <Text>Cargando productos...</Text>
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

  return (
      <View style={styles.container}>
    <View style={styles.header}>
        <View style={styles.headerText}>
      <Text style={styles.title}>Tienda Móvil</Text>

      <Text style={styles.subtitle}>Encuentra tus productos favoritos</Text>
        </View>

        <Link href="/cart" asChild>
            <Pressable style={styles.cartButton}>
                <Ionicons
                    name="cart-outline"
                    size={28}
                    color="#111827"
                />
                {totalItems > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{totalItems}</Text>
                    </View>
                )}
            </Pressable>
        </Link>
    </View>


      <FlatList style={styles.list}
                data={productsQuery.data}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.row}
                keyExtractor={(product)=> product.id.toString()}
                renderItem={function renderProduct({ item }) {
                    return (
                        <ProductCard
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                        />
                    );
                }}
      />
      </View>
  );
}

const styles= StyleSheet.create ({
    container:{
        flex: 1,
       backgroundColor:"#f3f4f6"
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    headerText: {
        flex: 1,
    },
    cartButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    cartBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#dc2626",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
    },
    title:{
        fontSize: 28,
        fontWeight: "bold",
    },
    subtitle:{
        fontSize: 16,
        marginTop: 8,
    },
    list: {
        flex:1,
        width: "100%",
        marginTop: 16,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 24,
    },
    row: {
        gap: 12,
    },
});