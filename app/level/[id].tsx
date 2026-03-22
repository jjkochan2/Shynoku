import { StyleSheet, Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { colors } from "../../src/theme/colors"
import Board from "../../src/components/Board"
import Piece from "@/src/components/Piece"

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
    },
    titleText: {
        color: "white",
        fontSize: 24,
        fontWeight: 600,
    },
    piecesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    boardContainer: {
        flex: 1,
        alignItems: "center",
    }

})

export const levelData = [
    {
        tiles: [
            { color: "white" },
            { color: "green" },
            { color: "red" },
            { color: "white" }
        ],
        numColumns: 2,
        pieces: [
            {
                tiles: [
                    { color: "black" },
                ],
                numColumns: 1,
            }
        ]
    },
    {
        tiles: [
            { color: "white" },
            { color: "white" },
            { color: "green" },
            { color: "white" },
            { color: "white" },
            { color: "white" },
            { color: "red" },
            { color: "white" },
            { color: "white" },
        ],
        numColumns: 3,
        pieces: [
            {
                tiles: [
                    { color: "black" },
                    { color: "clear" },
                    { color: "black" },
                    { color: "black" }
                ],
                numColumns: 2,
            },
            {
                tiles: [
                    { color: "black" },
                    { color: "clear" },
                    { color: "black" },
                    { color: "clear" }
                ],
                numColumns: 2,
            },
            {
                tiles: [
                    { color: "black" },
                    { color: "clear" },
                    { color: "black" },
                    { color: "black" }
                ],
                numColumns: 2,
            },
            {
                tiles: [
                    { color: "black" },
                    { color: "clear" },
                    { color: "black" },
                    { color: "clear" }
                ],
                numColumns: 2,
            }
        ]
    },
        {
        tiles: [
            { color: "white" },
            { color: "red" },
            { color: "green" },
            { color: "white" },
            { color: "white" },
            { color: "red" },
            { color: "green" },
            { color: "white" },
            { color: "white" },
            { color: "red" },
            { color: "green" },
            { color: "white" },
            { color: "white" },
            { color: "black" },
            { color: "green" },
            { color: "white" },
        ],
        numColumns: 4,
        pieces: [
            {
                tiles: [
                    { color: "black" },
                    { color: "clear" },
                    { color: "black" },
                    { color: "black" }
                ],
                numColumns: 2,
            }
        ]
    },
]

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
                <Board {...levelData[Number(id) - 1]}
                />
            </View>
            <View style={styles.piecesContainer}>
                <Piece {...levelData[Number(id) - 1].pieces[0]} />
            </View>
        </View>
    );
}