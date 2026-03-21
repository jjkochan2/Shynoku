import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    level2Screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default function Level1Screen() {
    return (
        <View style={styles.level2Screen}>
            <Text>Level 2 Screen</Text>
        </View>
    );
}