import { Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import {Link} from "expo-router";

export default function Catalog() {
    const productsQuery = useProducts();
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

      <Text style={styles.title}>Tienda Móvil</Text>
      <Text style={styles.subtitle}>Encuentra tus productos favoritos</Text>

        <Link href="/cart" asChild>
            <Pressable style={styles.cartButton}>
                <Text style={styles.cartButtonText}>Ver carrito</Text>
            </Pressable>
        </Link>

      <FlatList style={styles.list}
                data={productsQuery.data}
                keyExtractor={(product)=> product.id.toString()}
                renderItem={({item})=>(
                    <ProductCard
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        />
                )}
                />
    </View>
  );
}

const styles= StyleSheet.create ({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        width: "100%",
        marginTop: 24,
    },
    cartButton: {
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: "#111827",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    cartButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});