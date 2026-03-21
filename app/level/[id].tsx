import { StyleSheet, Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

const styles = StyleSheet.create({
    levelScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default function LevelScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View style={styles.levelScreen}>
            <Text>Level {id} Screen</Text>
        </View>
    );
}