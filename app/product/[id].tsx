import { useLocalSearchParams} from "expo-router";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {useProduct} from "../../hooks/useProduct";

export default function ProductDetailScreen(){
    const { id } =useLocalSearchParams<{ id:string }>();

    const productQuery = useProduct(id);

    if(productQuery.isPending){
        return(
            <View style={styles.container}>
                <Text>Cargando producto...</Text>
            </View>
        );
    }

    if (productQuery.isError) {
        return (
            <View style={styles.container}>
                <Text>{productQuery.error.message}</Text>
            </View>
        );
    }

    const product = productQuery.data;

    return (
       <ScrollView contentContainerStyle={styles.container}>
           <Image
               source={{ uri: product.image}}
               style={styles.image}
               resizeMode="contain"
               accessibilityLabel={product.title}
               />

           <Text style={styles.category}>{product.category}</Text>
           <Text style={styles.title}>{product.title}</Text>
           <Text style={styles.price}>${product.price.toFixed(2)}</Text>
           <Text style={styles.description}>{product.description}</Text>

           <View style={styles.ratingContainer}>
               <Text style={styles.rating}>★ {product.rating.rate}</Text>
               <Text style={styles.ratingCount}>({product.rating.count} reseñas)</Text>
           </View>

       </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        padding: 24,
        backgroundColor: "#f7f7f7",
    },
    image:{
        width:"100%",
        height:280,
        marginBottom:24,
        borderRadius:12,
        backgroundColor:"#ffffff",
    },
    category:{
        fontSize:14,
        color:"#666666",
        textTransform:"capitalize",
    },
    title:{
        marginTop:8,
        fontSize:24,
        fontWeight:"bold",
    },
    price:{
        marginTop:12,
        fontSize:22,
        fontWeight:"700",
        color:"#2563eb",
    },
    description:{
        marginTop:20,
        fontSize:16,
        lineHeight:24,
        color:"#333333",
    },
    ratingContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:20,
    },
    rating:{
        fontSize:17,
        fontWeight:"600",
        color:"#d97706"
    },
    ratingCount:{
        marginLeft:8,
        fontSize:15,
        color:"#666666"
    },
});