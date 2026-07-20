import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	tile: {
		flex: 1,
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export type TileProps = {
	color: string;
	shyne?: boolean;
};

export default function Tile({ color, shyne = false }: TileProps) {
	return (
		<View style={[styles.tile, { backgroundColor: color }]}>
			{shyne && (
				<View
					style={{
						backgroundColor: "aqua",
						width: "30%",
						height: "30%",
					}}
				></View>
			)}
		</View>
	);
}
