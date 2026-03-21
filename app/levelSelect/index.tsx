import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { useRouter } from "expo-router"
import { colors } from "../../src/theme/colors"

const styles = StyleSheet.create({
    levelSelectScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
    levelButton: {
        backgroundColor: "black",
        padding: "3%",
        borderRadius: 12,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    levelButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,

    },
    levelSelectGrid: {
        flex: 1,
    },
    title: {
        flex: 1,
        justifyContent: "center",
    }
})

export default function LevelSelectScreen() {
    const router = useRouter();
    return (
        <View style={styles.levelSelectScreen}>
            <View style={styles.title}>
                <Text>Level Select Screen</Text>
            </View>
            <View
                style={styles.levelSelectGrid}
            >
                <FlatList
                    data={[1, 2]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.levelButton}
                            onPress={() => {router.navigate(`/level/${item}`)}}
                        >
                            <Text style={styles.levelButtonText}>
                                {item}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
}