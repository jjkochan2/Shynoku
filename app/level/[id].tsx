import { StyleSheet, Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { colors } from "../../src/theme/colors"
import Board from "../../src/components/Board"

const styles = StyleSheet.create({
    levelScreen: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background
    },
    title: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "red"
    },
    titleText: {
        color: "white",
        fontSize: 24,
        fontWeight: 600,
    },
    pieces: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "green"
    },
    boardContainer: {
        flex: 1,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "yellow"
    }

})

export default function LevelScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View style={styles.levelScreen}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Level {id}
                </Text>
            </View>
            <View style={styles.boardContainer}>
                <Board
                    tiles={[{ color: "white" }, { color: "green" }, { color: "red" }, { color: "white" }]}
                />
            </View>
            <View style={styles.pieces}>
                <Text>Pieces</Text>
            </View>
        </View>
    );
}