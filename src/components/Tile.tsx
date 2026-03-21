import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    tile: {
        flex: 1,
    }
})

export default function Tile({ color }) {

    return (
        <View style={[styles.tile, { backgroundColor: color}]}></View>
    );
}