import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View, ImageBackground} from "react-native";

const welcomeBackground = require(
    "../assets/images/store-welcome-background.png",
    );

export default function WelcomeScreen() {
    return (
        <ImageBackground
            source={welcomeBackground}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.content}>

                    <Text style={styles.title}>
                        MOBILE STORE
                    </Text>

                    <Link href="/catalog" asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>
                                Explorar catálogo
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(3, 7, 18, 0.30)",
        padding: 24,
    },
    content: {
        alignItems: "center",
        paddingBottom: 120,
    },
    title: {
        marginTop: 16,
        color: "#ffffff",
        fontSize: 42,
        fontWeight: "bold",
        lineHeight: 48,
        textAlign: "center",
        letterSpacing: 2,
    },
    button: {
        width: "100%",
        maxWidth: 300,
        marginTop: 32,
        borderRadius: 14,
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 16,
        alignItems: "center",
        elevation: 4,
    },
    buttonText: {
        color: "#1e3a8a",
        fontSize: 17,
        fontWeight: "bold",
    },
});