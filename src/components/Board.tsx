import { FlatList, StyleSheet, View } from 'react-native'
import Tile, { TileProps } from './Tile'

const styles = StyleSheet.create({
    board: {
        flex: 1,
        aspectRatio: 1,
    },
});

type BoardProps = {
    tiles: TileProps[]
}

export default function Board({ tiles }: BoardProps) {
    return (
        <View style={styles.board}>
            <FlatList
                data={tiles}
                numColumns={2}
                scrollEnabled={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <Tile color={item.color} />}
                contentContainerStyle={{ flexGrow: 1 }} 
            >
            </FlatList>
        </View>
    );
}