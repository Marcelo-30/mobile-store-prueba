import { StyleSheet, Text, View } from "react-native";
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

        {products.map((product)=>(
            <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            />
        ))}
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
});