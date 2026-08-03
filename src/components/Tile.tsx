import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		padding: "2.5%",
		aspectRatio: 1,
	},
	tile: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "20%",
	},
});

export type TileProps = {
	color: string;
	shyne?: boolean;
};

export default function Tile({ color, shyne = false }: TileProps) {
	return (
		<View style={styles.wrapper}>
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
		</View>
	);
}
