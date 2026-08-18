import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Index() {
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

      <Text style={styles.title}>Tienda Mobil</Text>
      <Text style={styles.subtitle}>Encuentra tus productos favoritos</Text>

      <FlatList style={styles.list}
                data={productsQuery.data}
                keyExtractor={(product)=> product.id.toString()}
                renderItem={({item})=>(
                    <ProductCard
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
});