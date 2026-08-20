import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import {Link} from "expo-router";
import QuantityControl from "./QuantityControl";

type ProductCardProps ={
    id: number;
    title: string;
    price: number;
    image: string;
};

export default function ProductCard({id, title, price, image}:ProductCardProps){
    return(
        <View style={styles.card}>
        <Link
            href={{
            pathname: "/product/[id]",
                params:{
                id: id.toString(),
                },
        }}
            asChild
            >
        <Pressable style={styles.productContent}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
                accessibilityLabel={title}
            />

            <Text style={styles.title} numberOfLines={2}>{title}</Text>

            <Text style={styles.price}>${price.toFixed(2)}</Text>
        </Pressable>
    </Link>

            <QuantityControl productId={id}/>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minHeight: 260,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        backgroundColor: "#ffffff",
        padding: 12,
        elevation: 2,
    },
    productContent: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 110,
        marginBottom: 10,
    },
    title: {
        minHeight: 40,
        fontSize: 14,
        lineHeight: 19,
        fontWeight: "600",
        color: "#111827",
    },
    price: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: "bold",
        color: "#2563eb",
    },
});