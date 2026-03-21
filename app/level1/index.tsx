import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    level1Screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default function Level1Screen() {
    return (
        <View style={styles.level1Screen}>
            <Text>Level 1 Screen</Text>
        </View>
    );
}