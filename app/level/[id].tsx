import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Board from "@/src/components/Board";
import Piece from "@/src/components/Piece";
import { colors } from "@/src/theme/colors";

const styles = StyleSheet.create({
	levelScreen: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: colors.background,
		alignItems: "center",
	},
	title: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		color: "white",
		fontSize: 24,
		fontWeight: 600,
	},
	piecesContainer: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		borderWidth: 2,
		borderColor: "green",
		aspectRatio: 1,
		// flexDirection: "row"
	},
	boardContainer: {
		flex: 1,
		alignItems: "center",
	},
});

export const levelData = [
	{
		tiles: [
			{ color: "white" },
			{ color: "green" },
			{ color: "red" },
			{ color: "white" },
		],
		numColumns: 2,
		pieces: [
			{
				tiles: [{ color: "black" }],
				numColumns: 1,
			},
		],
	},
	{
		tiles: [
			{ color: "white" },
			{ color: "white" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "white" },
			{ color: "red" },
			{ color: "white" },
			{ color: "white" },
		],
		numColumns: 3,
		pieces: [
			{
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
			},
			{
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "clear" },
				],
				numColumns: 2,
			},
			{
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
			},
			{
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "clear" },
				],
				numColumns: 2,
			},
		],
	},
	{
		tiles: [
			{ color: "white" },
			{ color: "red" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "red" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "red" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "black" },
			{ color: "green" },
			{ color: "white" },
		],
		numColumns: 4,
		pieces: [
			{
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
			},
		],
	},
];

export default function LevelScreen() {
	const { id } = useLocalSearchParams();
	const level = levelData[Number(id) - 1];
	return (
		<View style={styles.levelScreen}>
			<View style={styles.title}>
				<Text style={styles.titleText}>Level {id}</Text>
			</View>
			<View style={styles.boardContainer}>
				<Board {...level} />
			</View>
			<View style={styles.piecesContainer}>
				<FlatList
					data={level.pieces}
					numColumns={level.pieces.length}
					scrollEnabled={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => <Piece {...item} />}
					contentContainerStyle={{ flexGrow: 1, padding: 20 }}
				></FlatList>
			</View>
		</View>
	);
}
