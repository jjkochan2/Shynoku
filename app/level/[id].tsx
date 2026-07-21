import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Board from "@/src/components/Board";
import Piece from "@/src/components/Piece";
import { levelData } from "@/src/data/levelData";

import styles from "./styles";

export default function LevelScreen() {
	const { id } = useLocalSearchParams();
	const initialLevel = levelData[Number(id) - 1];
	const [level, setLevel] = useState(initialLevel);
	const placePiece = (id: number, position: { row: number; col: number }) => {
		setLevel((prevLevel) => {
			const placedPiece = prevLevel.pieces.find(
				(piece) => piece.id === id,
			);

			if (!placedPiece) return prevLevel;

			const TILE_INDEX =
				position.row * prevLevel.numColumns + position.col;

			if (
				prevLevel.tiles[TILE_INDEX].color === "red" ||
				prevLevel.tiles[TILE_INDEX].color === "green"
			) {
				return prevLevel;
			}

			return {
				...prevLevel,

				pieces: prevLevel.pieces.map((piece) =>
					piece.id === id ? { ...piece, placed: true } : piece,
				),

				tiles: prevLevel.tiles.map((tile, index) =>
					index === TILE_INDEX
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
		<SafeAreaView style={styles.container}>
			<View style={styles.backArrow}>
				<Pressable onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={28} color="white" />
				</Pressable>
			</View>
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
		</SafeAreaView>
	);
}
