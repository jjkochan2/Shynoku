import { Pressable, StyleSheet, Text, View } from "react-native"
import { useRouter } from "expo-router"

const styles = StyleSheet.create({
    levelSelectScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0077ffff",
    },
    level1Button: {
        backgroundColor: "black",
        padding: "3%",
        borderRadius: 12,
        aspectRatio: 1,
        alignItems: "center"
    },
    level1ButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,

    }
})

export default function LevelSelectScreen() {
    const router = useRouter();
    return (
        <View style={styles.levelSelectScreen}>
            <Text>Level Select Screen</Text>
            <Pressable
                style={styles.level1Button}
                onPress={() => {router.navigate('/level1')}}
            >
                <Text style={styles.level1ButtonText}>
                    1
                </Text>
            </Pressable>
        </View>
    );
}