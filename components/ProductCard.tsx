import {Pressable, StyleSheet, Text} from "react-native";
import {Link} from "expo-router";

type ProductCardProps ={
    id: number;
    title: string;
    price: number;
};

export default function ProductCard({id, title, price}:ProductCardProps){
    return(
        <Link
            href={{
            pathname: "/product/[id]",
                params:{
                id: id.toString(),
                },
        }}
            asChild
            >
        <Pressable style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
        </Pressable>
    </Link>
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