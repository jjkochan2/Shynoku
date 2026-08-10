import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Board from "@/src/components/Board";
import Piece from "@/src/components/Piece";
import { Level, levelData, Tile } from "@/src/data/levelData";
import {
	defaultSaveData,
	getSaveData,
	SaveData,
	updateSaveData,
} from "@/src/data/localStorage";

import styles from "./styles";

export default function LevelScreen() {
	const { id } = useLocalSearchParams();
	const initialLevel = levelData[Number(id) - 1];
	const [level, setLevel] = useState(initialLevel);
	const [levelSolved, setLevelSolved] = useState(false);
	const [saveData, setSaveData] = useState<SaveData>(defaultSaveData);

	useEffect(() => {
		async function load() {
			setSaveData(await getSaveData());
		}

		load();
	}, []);
	const placePiece = (id: number, position: { row: number; col: number }) => {
		setLevel((prevLevel) => {
			const placedPiece = prevLevel.pieces.find(
				(piece) => piece.id === id,
			);

			if (!placedPiece) return prevLevel;

			const newTiles = [...prevLevel.tiles];

			// iterate through each tile in piece
			for (let i = 0; i < placedPiece.tiles.length; i++) {
				if (placedPiece.tiles[i].color === "clear") {
					continue;
				}
				// map the tile to a board position
				const row =
					position.row + Math.floor(i / placedPiece.numColumns);
				const col = position.col + (i % placedPiece.numColumns);

				// attempt to place the tile at that board position
				const TILE_INDEX = row * prevLevel.numColumns + col;

				// if tile can't be placed, cancel the operation
				if (
					TILE_INDEX >= prevLevel.tiles.length ||
					prevLevel.tiles[TILE_INDEX].color === "red" ||
					prevLevel.tiles[TILE_INDEX].color === "green" ||
					col >= prevLevel.numColumns
				) {
					return prevLevel;
				}
				// else after each tile has been placed, update baord to new state
				else {
					if (placedPiece.tiles[i].color !== "clear") {
						if (prevLevel.tiles[TILE_INDEX].color === "white") {
							newTiles[TILE_INDEX] = {
								...newTiles[TILE_INDEX],
								color: placedPiece.tiles[i].color,
							};
						} else if (
							prevLevel.tiles[TILE_INDEX].color === "black"
						) {
							newTiles[TILE_INDEX] = {
								...newTiles[TILE_INDEX],
								color: "white",
							};
						}
					}
				}
			}

			return {
				...prevLevel,

				pieces: prevLevel.pieces.map((piece) =>
					piece.id === id ? { ...piece, placed: true } : piece,
				),

				tiles: newTiles,
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

	const boardBoundsRef = useRef<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

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

	const isLevelSolved = (level: Level) => {
		type Board = {
			tiles: Tile[];
			numColumns: number;
		};

		function pathExists(
			board: Board,
			startIndex: number,
			endIndex: number,
		): boolean {
			const { tiles, numColumns } = board;
			const numRows = Math.ceil(tiles.length / numColumns);

			const isTraversable = (tile: Tile) =>
				tile.color === "black" ||
				tile.color === "green" ||
				tile.color === "red";

			if (
				!isTraversable(tiles[startIndex]) ||
				!isTraversable(tiles[endIndex])
			) {
				return false;
			}

			const visited = new Array(tiles.length).fill(false);
			const queue: number[] = [startIndex];
			visited[startIndex] = true;

			const directions = [
				[-1, 0], // up
				[1, 0], // down
				[0, -1], // left
				[0, 1], // right
			];

			while (queue.length > 0) {
				const current = queue.shift()!;

				if (current === endIndex) {
					return true;
				}

				const row = Math.floor(current / numColumns);
				const col = current % numColumns;

				for (const [dr, dc] of directions) {
					const newRow = row + dr;
					const newCol = col + dc;

					if (
						newRow < 0 ||
						newRow >= numRows ||
						newCol < 0 ||
						newCol >= numColumns
					) {
						continue;
					}

					const neighbor = newRow * numColumns + newCol;

					if (
						neighbor < tiles.length &&
						isTraversable(tiles[neighbor]) &&
						!visited[neighbor]
					) {
						visited[neighbor] = true;
						queue.push(neighbor);
					}
				}
			}

			return false;
		}

		const startIndex = level.tiles.findIndex(
			(tile) => tile.color === "green",
		);
		const endIndex = level.tiles.findIndex((tile) => tile.color === "red");
		const board = {
			tiles: level.tiles,
			numColumns: level.numColumns,
		};
		if (
			level.pieces.every((piece) => piece.placed) &&
			pathExists(board, startIndex, endIndex)
		) {
			return true;
		} else {
			return false;
		}
	};

	const allShynesAreBlack = (level: Level) => {
		for (const tile of level.tiles) {
			if (tile.shyne) {
				if (tile.color !== "black") {
					return false;
				}
			}
		}
		return true;
	};

	const colorAllPathTiles = (color: string) => {
		const colorsToReplace = new Set(["red", "green", "black"]);

		setLevel((prevLevel) => ({
			...prevLevel,
			tiles: prevLevel.tiles.map((tile) => ({
				...tile,
				color: colorsToReplace.has(tile.color) ? color : tile.color,
			})),
		}));
	};

	const resetLevel = () => {
		setLevel(initialLevel);
		setLevelSolved(false);
	};

	useEffect(() => {
		if (levelSolved) return;

		if (isLevelSolved(level)) {
			async function handleLevelSolved() {
				setLevelSolved(true);
				await updateSaveData((saveData) => {
					if (saveData.highestUnlockedLevel === Number(id)) {
						saveData.highestUnlockedLevel = Number(id) + 1;
					}

					if (allShynesAreBlack(level)) {
						saveData.levels[Number(id) - 1].allShynesCollected =
							true;
					}
				});

				if (allShynesAreBlack(level)) {
					colorAllPathTiles("aqua");
				} else {
					colorAllPathTiles("green");
				}
			}
			handleLevelSolved();
		}
	}, [level, levelSolved, saveData.highestUnlockedLevel, id]);

	const [showHelp, setShowHelp] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navigationBar}>
				<Pressable onPress={() => router.navigate("/levelSelect")}>
					<Ionicons name="chevron-back" size={28} color="white" />
				</Pressable>
				<View
					style={{
						flexDirection: "row",
						gap: 16,
					}}
				>
					<Pressable
						style={{
							borderWidth: 2,
							borderColor: "white",
							borderRadius: 999,
						}}
						onPress={() => {
							setShowHelp(true);
						}}
					>
						<Ionicons name="help" size={24} color="white" />
					</Pressable>
					<Pressable onPress={() => resetLevel()}>
						<Ionicons name="refresh" size={28} color="white" />
					</Pressable>
				</View>
			</View>
			<View style={styles.title}>
				<Text style={styles.titleText}>Level {id}</Text>
			</View>
			<View
				ref={boardRef}
				style={styles.boardContainer}
				onLayout={() => {
					boardRef.current?.measureInWindow((x, y, width, height) => {
						const bounds = { x, y, width, height };

						boardBoundsRef.current = bounds;
						setBoardBounds(bounds);
					});
				}}
			>
				<Board {...level} />
			</View>
			{levelSolved && (
				<Pressable
					style={styles.nextLevelContainer}
					onPress={() => {
						const TOTAL_LEVELS = levelData.length;
						if (Number(id) < TOTAL_LEVELS) {
							router.navigate(`/level/${Number(id) + 1}`);
						} else {
							router.navigate("/levelSelect");
						}
					}}
				>
					<Text style={styles.nextLevelText}>Next Level</Text>
					<Ionicons name="chevron-forward" size={28} color="white" />
				</Pressable>
			)}
			<View style={styles.piecesContainer}>
				{level.pieces.map((item) => (
					<Piece
						maxWidth={"25%"}
						key={item.id}
						{...item}
						isDragging={draggingPiece?.id === item.id}
						onDragStart={(id) => {
							const piece = level.pieces.find((p) => p.id === id);
							if (piece) setDraggingPiece(piece);
						}}
						onDrag={(position) => {
							const bounds = boardBoundsRef.current;

							if (!bounds) return;

							const tileSize = bounds.width / level.numColumns;
							const maxNumberOfTilesPieceWidth = item.numColumns;

							setDragPosition({
								x:
									position.x -
									(tileSize *
										(maxNumberOfTilesPieceWidth - 1)) /
										2,
								y:
									position.y -
									tileSize * maxNumberOfTilesPieceWidth,
							});
						}}
						onDrop={(position) => {
							const bounds = boardBoundsRef.current;

							if (!bounds) return;

							const tileSize = bounds.width / level.numColumns;
							const maxNumberOfTilesPieceWidth = item.numColumns;

							handleDrop(item.id, {
								x:
									position.x -
									(tileSize *
										(maxNumberOfTilesPieceWidth - 1)) /
										2,
								y:
									position.y -
									tileSize * maxNumberOfTilesPieceWidth,
							});

							setDraggingPiece(null);
							setDragPosition(null);
						}}
					/>
				))}
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
						width:
							(boardBounds.width * draggingPiece.numColumns) /
							level.numColumns,
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
			<Modal
				visible={showHelp}
				transparent
				animationType="fade"
				onRequestClose={() => setShowHelp(false)}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}
				>
					<View
						style={{
							backgroundColor: "white",
							padding: 20,
							borderRadius: 10,
							width: "75%",
							alignItems: "center",
							gap: 24,
						}}
					>
						<Pressable
							onPress={() => setShowHelp(false)}
							style={{
								position: "absolute",
								right: 4,
								top: 4,
								borderWidth: 2,
								borderRadius: 999,
							}}
						>
							<Ionicons name="close" size={28} color="black" />
						</Pressable>
						<Text
							style={{
								fontWeight: 800,
								fontSize: 32,
							}}
						>
							How to Play
						</Text>
						<Text
							style={{
								fontWeight: 300,
								fontSize: 24,
							}}
						>
							Create a path from the red tile to the green tile by
							dragging pieces onto the board.
						</Text>
						<Text
							style={{
								fontWeight: 300,
								fontSize: 24,
							}}
						>
							You must place down all pieces to complete a level.
						</Text>
						<Text
							style={{
								fontWeight: 300,
								fontSize: 24,
							}}
						>
							Create a path that covers all &apos;shyne&apos;
							tiles for a bonus.
						</Text>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
