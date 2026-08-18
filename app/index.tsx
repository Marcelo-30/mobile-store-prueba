import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Tienda Móvil</Text>

            <Text style={styles.subtitle}>Encuentra tus productos favoritos</Text>

            <Link href="/catalog" asChild>
                <Pressable style={styles.button}>

                <Text style={styles.buttonText}>Entrar al catálogo</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
    },
    title:{
        fontSize:32,
        fontWeight:"bold",
    },
    subtitle:{
        marginTop:8,
        fontSize:16,
        textAlign:"center",
        color:"#666666",
    },
    button:{
        marginTop: 24,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#2563eb",
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "600",
        color: "#ffffff",
    },
});