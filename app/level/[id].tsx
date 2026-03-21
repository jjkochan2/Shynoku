import { StyleSheet, Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { colors } from "../../src/theme/colors"

const styles = StyleSheet.create({
    levelScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
    },
    title: {
        flex: 1,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "red"
    },
    titleText: {
        color: "white",
        fontSize: 24,
        fontWeight: 600,
    },
    board: {
        flex: 1,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "yellow"
    },
    pieces: {
        flex: 1,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "green"
    },

})

function Board() {
    return (
        <View>
            <Text>Board</Text>
        </View>
    );
}

export default function LevelScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View style={styles.levelScreen}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Level {id}
                </Text>
            </View>
            <View style={styles.board}>
                <Board />
            </View>
            <View style={styles.pieces}>
                <Text>Pieces</Text>
            </View>
        </View>
    );
}