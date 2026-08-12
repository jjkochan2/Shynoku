import { Level } from "./data/levelData";

function generateRandomBoard(
	gridSize: number,
	shyneProbability: number,
	placeRedAndGreen: boolean = true,
) {
	const numberOfTiles = gridSize * gridSize;

	const tiles = Array.from({ length: numberOfTiles }, () => ({
		color: "white",
		shyne: Math.random() < shyneProbability,
	}));

	if (placeRedAndGreen) {
		const greenIndex = Math.floor(Math.random() * numberOfTiles);

		let redIndex = Math.floor(Math.random() * numberOfTiles);
		while (redIndex === greenIndex) {
			redIndex = Math.floor(Math.random() * numberOfTiles);
		}

		tiles[greenIndex] = {
			color: "green",
			shyne: false,
		};

		tiles[redIndex] = {
			color: "red",
			shyne: false,
		};
	}

	return {
		tiles,
		numColumns: gridSize,
	};
}

function generateRandomPiece(gridSize: number) {
	const numberOfTiles = gridSize * gridSize;
	const tiles = Array.from({ length: numberOfTiles }, () => ({
		color: Math.random() < 0.5 ? "black" : "clear",
	}));
	return {
		id: 1,
		tiles,
		numColumns: gridSize,
		placed: false,
	};
}

function generateRandomPieces(numberOfPieces: number) {
	return {
		pieces: Array.from({ length: numberOfPieces }, (_, index) => ({
			...generateRandomPiece(3),
			id: index + 1,
		})),
	};
}

// function randomIntInclusive(lowerBound: number, upperBound: number) {
// 	return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
// }

export function placePieceOnLevel(
	level: Level,
	id: number,
	position: { row: number; col: number },
): Level {
	const placedPiece = level.pieces.find((piece) => piece.id === id);

	if (!placedPiece) return level;

	const newTiles = [...level.tiles];

	for (let i = 0; i < placedPiece.tiles.length; i++) {
		if (placedPiece.tiles[i].color === "clear") {
			continue;
		}

		const row = position.row + Math.floor(i / placedPiece.numColumns);

		const col = position.col + (i % placedPiece.numColumns);

		const TILE_INDEX = row * level.numColumns + col;

		if (
			TILE_INDEX >= level.tiles.length ||
			level.tiles[TILE_INDEX].color === "red" ||
			level.tiles[TILE_INDEX].color === "green" ||
			col >= level.numColumns
		) {
			return level;
		}

		if (level.tiles[TILE_INDEX].color === "white") {
			newTiles[TILE_INDEX] = {
				...newTiles[TILE_INDEX],
				color: placedPiece.tiles[i].color,
			};
		} else if (level.tiles[TILE_INDEX].color === "black") {
			newTiles[TILE_INDEX] = {
				...newTiles[TILE_INDEX],
				color: "white",
			};
		}
	}

	return {
		...level,
		pieces: level.pieces.map((piece) =>
			piece.id === id ? { ...piece, placed: true } : piece,
		),
		tiles: newTiles,
	};
}

function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

function replaceAllBlackTilesWithWhiteAndShynes(level: Level): Level {
	return {
		...level,
		tiles: level.tiles.map((tile) =>
			tile.color === "black"
				? { ...tile, color: "white", shyne: true }
				: tile,
		),
	};
}

function resetAllPiecesToUnplaced(level: Level): Level {
	return {
		...level,
		pieces: level.pieces.map((piece) => ({
			...piece,
			placed: false,
		})),
	};
}

export function generateRandomLevel() {
	const pieces = generateRandomPieces(3);
	const board = generateRandomBoard(5, 0, false);

	let level: Level = {
		...board,
		...pieces,
		isUnlocked: false,
	};

	for (const piece of pieces.pieces) {
		let placed = false;

		const positions = shuffle(
			Array.from(
				{ length: level.numColumns * level.numColumns },
				(_, i) => ({
					row: Math.floor(i / level.numColumns),
					col: i % level.numColumns,
				}),
			),
		);

		for (const position of positions) {
			const newLevel = placePieceOnLevel(level, piece.id, position);

			if (newLevel !== level) {
				level = newLevel;
				placed = true;
				break;
			}
		}

		if (!placed) {
			console.log(`Could not place piece ${piece.id}`);
		}
	}

	level = replaceAllBlackTilesWithWhiteAndShynes(level);
	level = resetAllPiecesToUnplaced(level);

	return level;
}
