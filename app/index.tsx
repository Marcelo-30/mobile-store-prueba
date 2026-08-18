import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";

const products=[
    {
        id:1,
        title:"Mochila",
        price:149.99,
    },
    {
        id:2,
        title:"Laptop",
        price:8499.99,
    },
];

export default function Index() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Tienda Mobil</Text>
      <Text style={styles.subtitle}>Encuentra tus productos favoritos</Text>

      <FlatList style={styles.list}
                data={products}
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