import {Pressable, StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router";
import QuantityControl from "./QuantityControl";

type ProductCardProps ={
    id: number;
    title: string;
    price: number;
};

export default function ProductCard({id, title, price}:ProductCardProps){
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
        <Pressable>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
        </Pressable>
    </Link>

            <QuantityControl productId={id}/>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#dddddd",
        borderRadius: 12,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    price: {
        marginTop: 8,
        fontSize: 17,
        fontWeight: "600",
        color: "#2563eb",
    },
});