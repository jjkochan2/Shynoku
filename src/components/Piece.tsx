import { FlatList, StyleSheet, View } from "react-native";

import Tile, { TileProps } from "./Tile";

type PieceProps = {
	tiles: TileProps[];
	numColumns: number;
};

const styles = StyleSheet.create({
	piece: {
		flex: 1,
		borderWidth: 2,
		borderColor: "red",
	},
});

export default function Piece({ tiles, numColumns }: PieceProps) {
	return (
		<View style={styles.piece}>
			<FlatList
				data={tiles}
				numColumns={numColumns}
				scrollEnabled={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <Tile color={item.color} />}
				contentContainerStyle={{ flexGrow: 1 }}
			></FlatList>
		</View>
	);
}
