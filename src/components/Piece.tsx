import { StyleSheet, View } from "react-native";

import Board from "./Board";
import { TileProps } from "./Tile";

type PieceProps = {
	tiles: TileProps[];
	numColumns: number;
};

const styles = StyleSheet.create({
	piece: {},
});

export default function Piece({ tiles, numColumns }: PieceProps) {
	return (
		<View style={styles.piece}>
			<Board tiles={tiles} numColumns={numColumns} />
		</View>
	);
}
