import { Pressable, StyleSheet, Text, View } from "react-native"
import { useRouter } from "expo-router"
import { colors } from "../../src/theme/colors"

const styles = StyleSheet.create({
    levelSelectScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
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

    },
    level2Button: {
        backgroundColor: "black",
        padding: "3%",
        borderRadius: 12,
        aspectRatio: 1,
        alignItems: "center"
    },
    level2ButtonText: {
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
                onPress={() => {router.navigate('/level/1')}}
            >
                <Text style={styles.level1ButtonText}>
                    1
                </Text>
            </Pressable>
            <Pressable
                style={styles.level2Button}
                onPress={() => {router.navigate('/level/2')}}
            >
                <Text style={styles.level2ButtonText}>
                    2
                </Text>
            </Pressable>
        </View>
    );
}