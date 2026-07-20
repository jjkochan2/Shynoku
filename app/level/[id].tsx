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
		aspectRatio: 1,
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
				placed: false,
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
				placed: false,
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
				placed: false,
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
				placed: false,
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
				placed: false,
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
				placed: false,
			},
		],
	},
];

export default function LevelScreen() {
	const { id } = useLocalSearchParams();
	const initialLevel = levelData[Number(id) - 1];
	const [level, setLevel] = useState(initialLevel);
	const placePiece = (id: number, position: { row: number; col: number }) => {
		console.log(
			`placing piece: ${id} at row: ${position.row} col: ${position.col}`,
		);
		setLevel((prevLevel) => {
			const placedPiece = prevLevel.pieces.find(
				(piece) => piece.id === id,
			);

			if (!placedPiece) return prevLevel;

			return {
				...prevLevel,

				pieces: prevLevel.pieces.map((piece) =>
					piece.id === id ? { ...piece, placed: true } : piece,
				),

				tiles: prevLevel.tiles.map((tile, index) =>
					index === position.row * prevLevel.numColumns + position.col
						? { ...tile, color: placedPiece.tiles[0].color }
						: tile,
				),
			};
		});
	};
	const handleDrop = (
		pieceId: number,
		position: { x: number; y: number },
	) => {
		if (!boardBounds) return;

		const isWithinBoundaries = (
			position: {
				x: number;
				y: number;
			},
			boundaries: {
				x: number;
				y: number;
				width: number;
				height: number;
			},
		): boolean => {
			if (
				position.x > boundaries.x &&
				position.x < boundaries.x + boundaries.width &&
				position.y > boundaries.y &&
				position.y < boundaries.y + boundaries.height
			) {
				return true;
			} else {
				return false;
			}
		};

		if (isWithinBoundaries(position, boardBounds)) {
			const relativeX = position.x - boardBounds.x;
			const relativeY = position.y - boardBounds.y;

			const cellSize = boardBounds.width / level.numColumns;

			const col = Math.floor(relativeX / cellSize);
			const row = Math.floor(relativeY / cellSize);

			placePiece(pieceId, { row, col });
		}
	};
	const boardRef = useRef<View>(null);

	const [boardBounds, setBoardBounds] = useState<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

	const [dragPosition, setDragPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);

	const [draggingPiece, setDraggingPiece] = useState<
		(typeof level.pieces)[number] | null
	>(null);

	return (
		<View style={styles.levelScreen}>
			<View style={styles.title}>
				<Text style={styles.titleText}>Level {id}</Text>
			</View>
			<View
				ref={boardRef}
				style={styles.boardContainer}
				onLayout={() => {
					boardRef.current?.measureInWindow((x, y, width, height) => {
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
							isDragging={draggingPiece?.id === item.id}
							onDragStart={(id) => {
								const piece = level.pieces.find(
									(p) => p.id === id,
								);
								if (piece) setDraggingPiece(piece);
							}}
							onDrag={(position) => setDragPosition(position)}
							onDrop={(position) => {
								handleDrop(item.id, position);
								setDraggingPiece(null);
								setDragPosition(null);
							}}
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
			{draggingPiece && dragPosition && boardBounds && (
				<View
					style={{
						position: "absolute",
						left:
							dragPosition.x -
							boardBounds.width / level.numColumns / 2,
						top:
							dragPosition.y -
							boardBounds.width / level.numColumns / 2,
						width: boardBounds.width / level.numColumns,
					}}
				>
					<Piece
						isDragging={false}
						{...draggingPiece}
						onDragStart={() => {}}
						onDrag={() => {}}
						onDrop={() => {}}
					/>
				</View>
			)}
		</View>
	);
}
