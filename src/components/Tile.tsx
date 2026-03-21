import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        aspectRatio: 1,
    }
})

export type TileProps = {
    color: string
}

export default function Tile({ color }: TileProps) {
    return (
        <View style={[styles.tile, { backgroundColor: color}]}></View>
    );
}