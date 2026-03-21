import { StyleSheet, Text, View, Pressable } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { colors } from "../../src/theme/colors"
import Tile from "../../src/components/Tile"

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
    board: {
        flex: 1,
    },
    pieces: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "green"
    },

})

function Board() {

    return (
        <View style={styles.board}>
            <Tile color="white"/>
            <Tile color="green"/>
            <Tile color="red"/>
            <Tile color="white"/>
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
            <Board />
            <View style={styles.pieces}>
                <Text>Pieces</Text>
            </View>
        </View>
    );
}