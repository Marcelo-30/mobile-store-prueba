import {StyleSheet, View, Text} from "react-native";

type ProductCardProps ={
    title: string;
    price: number;
}

export default function ProductCard({title, price}:ProductCardProps){
    return(
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
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