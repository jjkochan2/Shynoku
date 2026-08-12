import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
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
import {
	generateRandomLevel,
	getPieceDimensions,
	placePieceOnLevel,
} from "@/src/utils";

import styles from "./styles";

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
		if (Number.isNaN(startIndex) || Number.isNaN(endIndex)) return false;
		if (startIndex === -1 || endIndex === -1)
			return allShynesAreBlack(level) && allNonShynesAreNotBlack(level);
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

	const startIndex = level.tiles.findIndex((tile) => tile.color === "green");
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

const allNonShynesAreNotBlack = (level: Level) => {
	for (const tile of level.tiles) {
		if (!tile.shyne) {
			if (tile.color === "black") {
				return false;
			}
		}
	}
	return true;
};

export default function LevelScreen() {
	const { id, score: scoreParam } = useLocalSearchParams();
	const [score, setScore] = useState(scoreParam ? Number(scoreParam) : 0);
	const initialLevel =
		levelData[Number(id) - 1] ||
		generateRandomLevel(
			Math.min(3 + Math.floor(score / 5), 7),
			3,
			Math.min(2 + Math.floor(score / 6), 5),
		);
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
		setLevel((prevLevel) => placePieceOnLevel(prevLevel, id, position));
	};
	const handleDrop = (
		pieceId: number,
		position: { x: number; y: number },
	) => {
		if (!boardBounds) return;

		// const isWithinBoundaries = (
		// 	position: {
		// 		x: number;
		// 		y: number;
		// 	},
		// 	boundaries: {
		// 		x: number;
		// 		y: number;
		// 		width: number;
		// 		height: number;
		// 	},
		// ): boolean => {
		// 	if (
		// 		position.x > boundaries.x &&
		// 		position.x < boundaries.x + boundaries.width &&
		// 		position.y > boundaries.y &&
		// 		position.y < boundaries.y + boundaries.height
		// 	) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// };

		const relativeX = position.x - boardBounds.x;
		const relativeY = position.y - boardBounds.y;

		const cellSize = boardBounds.width / level.numColumns;

		const col = Math.floor(relativeX / cellSize);
		const row = Math.floor(relativeY / cellSize);

		placePiece(pieceId, { row, col });
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

	const handleRefreshPress = () => {
		if (
			id === "endless" &&
			score > 0 &&
			level.pieces.some((piece) => !piece.placed)
		) {
			Alert.alert(
				"Restart Endless Mode?",
				"Your game will end at current score.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Restart",
						style: "destructive",
						onPress: () => {
							resetLevel();
							setScore(0);
						},
					},
				],
			);
		} else {
			resetLevel();
			setScore(0);
		}
	};

	useEffect(() => {
		if (levelSolved) return;

		if (isLevelSolved(level)) {
			async function handleLevelSolved() {
				setLevelSolved(true);
				await updateSaveData((saveData) => {
					if (id !== "endless") {
						if (saveData.highestUnlockedLevel === Number(id)) {
							saveData.highestUnlockedLevel = Number(id) + 1;
						}

						if (allShynesAreBlack(level)) {
							saveData.levels[Number(id) - 1].allShynesCollected =
								true;
						}
					} else {
						if (
							!saveData.endlessHighScore ||
							score + 1 > saveData.endlessHighScore
						) {
							saveData.endlessHighScore = score + 1;
						}
						setScore((prevScore) => prevScore + 1);
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
	}, [level, levelSolved, saveData.highestUnlockedLevel, id, score]);

	const [showHelp, setShowHelp] = useState(false);

	const handleBackButtonPress = () => {
		if (
			id === "endless" &&
			score > 0 &&
			level.pieces.some((piece) => !piece.placed)
		) {
			Alert.alert(
				"Exit Endless Mode?",
				"Your game will end at current score.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Exit",
						style: "destructive",
						onPress: () => {
							router.navigate("/levelSelect");
						},
					},
				],
			);
		} else {
			router.navigate("/levelSelect");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navigationBar}>
				<Pressable onPress={() => handleBackButtonPress()}>
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
					<Pressable onPress={() => handleRefreshPress()}>
						<Ionicons name="refresh" size={28} color="white" />
					</Pressable>
				</View>
			</View>
			<View style={styles.title}>
				<Text style={styles.titleText}>
					{id === "endless" ? `Score: ${score}` : `Level ${id}`}
				</Text>
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
						if (id === "endless") {
							router.replace({
								pathname: "/level/[id]",
								params: {
									id: "endless",
									score: score.toString(),
								},
							});
						} else if (Number(id) < TOTAL_LEVELS) {
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
							const realPieceDimensions =
								getPieceDimensions(item);
							const maxNumberOfTilesPieceWidth =
								realPieceDimensions.width;
							const maxNumberOfTilesPieceHeight =
								realPieceDimensions.height;
							const xPosition =
								position.x -
								(tileSize * (maxNumberOfTilesPieceWidth - 1)) /
									2 -
								tileSize *
									realPieceDimensions.columnsCroppedLeft;
							const yPosition =
								position.y -
								tileSize * maxNumberOfTilesPieceHeight -
								tileSize * realPieceDimensions.rowsCroppedTop;

							setDragPosition({
								x: xPosition,
								y: yPosition,
							});
						}}
						onDrop={(position) => {
							const bounds = boardBoundsRef.current;

							if (!bounds) return;

							const tileSize = bounds.width / level.numColumns;
							const realPieceDimensions =
								getPieceDimensions(item);
							const maxNumberOfTilesPieceWidth =
								realPieceDimensions.width;
							const maxNumberOfTilesPieceHeight =
								realPieceDimensions.height;
							const xPosition =
								position.x -
								(tileSize * (maxNumberOfTilesPieceWidth - 1)) /
									2 -
								tileSize *
									realPieceDimensions.columnsCroppedLeft;
							const yPosition =
								position.y -
								tileSize * maxNumberOfTilesPieceHeight -
								tileSize * realPieceDimensions.rowsCroppedTop;

							handleDrop(item.id, {
								x: xPosition,
								y: yPosition,
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
						{id !== "endless" ? (
							<>
								<Text
									style={{
										fontWeight: 300,
										fontSize: 24,
									}}
								>
									Create a path from the red tile to the green
									tile by dragging pieces onto the board.
								</Text>
								<Text
									style={{
										fontWeight: 300,
										fontSize: 24,
									}}
								>
									You must place down all pieces to complete a
									level.
								</Text>
								<Text
									style={{
										fontWeight: 300,
										fontSize: 24,
									}}
								>
									Create a path that covers all
									&apos;shyne&apos; tiles for a bonus.
								</Text>
							</>
						) : (
							<>
								<Text
									style={{
										fontWeight: 300,
										fontSize: 24,
									}}
								>
									In endless mode, win by covering all
									&apos;shyne&apos; tiles with pieces.
								</Text>
								<Text
									style={{
										fontWeight: 300,
										fontSize: 24,
									}}
								>
									After all pieces have been placed, no black
									tiles that do not cover a shyne can remain.
								</Text>
								<Text
									style={{
										fontWeight: 300,
										fontSize: 24,
									}}
								>
									You must place down all pieces to complete a
									level.
								</Text>
								<Text
									style={{
										fontWeight: 300,
										fontSize: 24,
									}}
								>
									There are NO redos in endless mode unless
									your score is still 0.
								</Text>
							</>
						)}
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
