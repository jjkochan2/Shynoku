import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
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
				id: 1,
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
				id: 1,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
			},
			{
				id: 2,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "clear" },
				],
				numColumns: 2,
			},
			{
				id: 3,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
			},
			{
				id: 4,
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
				id: 1,
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
	const handleDrop = (
		pieceId: number,
		position: { x: number; y: number },
	) => {
		console.log("dropped:", pieceId);
		console.log("position:", position);
		console.log("boardBounds:", boardBounds);
	};
	const boardRef = useRef<View>(null);

	const [boardBounds, setBoardBounds] = useState<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);
	return (
		<View style={styles.levelScreen}>
			<View style={styles.title}>
				<Text style={styles.titleText}>Level {id}</Text>
			</View>
			<View
				ref={boardRef}
				style={styles.boardContainer}
				onLayout={() => {
					console.log("layout");

					console.log(boardRef.current);

					boardRef.current?.measureInWindow((x, y, width, height) => {
						console.log("MEASURE CALLBACK");
						console.log(x, y, width, height);

						setBoardBounds({ x, y, width, height });
					});
				}}
			>
				<Board {...level} />
			</View>
			<View style={styles.piecesContainer}>
				<FlatList
					data={level.pieces}
					numColumns={level.pieces.length}
					scrollEnabled={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => (
						<Piece
							{...item}
							onDrop={(position) => handleDrop(item.id, position)}
						/>
					)}
					contentContainerStyle={{ flexGrow: 1, padding: 20 }}
				></FlatList>
			</View>
			{/* this is a little debugging view */}
			{/* {boardBounds && (
				<View
					pointerEvents="none"
					style={{
						position: "absolute",
						left: boardBounds.x,
						top: boardBounds.y,
						width: boardBounds.width,
						height: boardBounds.height,
						borderWidth: 3,
						borderColor: "yellow",
					}}
				/>
			)} */}
		</View>
	);
}
