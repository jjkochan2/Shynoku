import { Level, Piece, Tile } from "./data/levelData";
import { colors } from "./theme/colors";

export const allShynesAreBlack = (level: Level) => {
	for (const tile of level.tiles) {
		if (tile.shyne) {
			if (tile.color !== colors.black) {
				return false;
			}
		}
	}
	return true;
};

const allNonShynesAreNotBlack = (level: Level) => {
	for (const tile of level.tiles) {
		if (!tile.shyne) {
			if (tile.color === colors.black) {
				return false;
			}
		}
	}
	return true;
};

export const isLevelSolved = (level: Level) => {
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
			tile.color === colors.black ||
			tile.color === colors.green ||
			tile.color === colors.red;

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
		(tile) => tile.color === colors.green,
	);
	const endIndex = level.tiles.findIndex((tile) => tile.color === colors.red);
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

function generateRandomBoard(
	gridSize: number,
	shyneProbability: number,
	placeRedAndGreen: boolean = true,
	forceRedAndGreenCorner: boolean = true,
) {
	const numberOfTiles = gridSize * gridSize;

	const tiles = Array.from({ length: numberOfTiles }, () => ({
		color: colors.white,
		shyne: Math.random() < shyneProbability,
	}));

	if (placeRedAndGreen) {
		const greenIndex = forceRedAndGreenCorner
			? gridSize - 1
			: Math.floor(Math.random() * numberOfTiles);

		const greenRow = Math.floor(greenIndex / gridSize);
		const greenCol = greenIndex % gridSize;

		let redIndex = forceRedAndGreenCorner
			? numberOfTiles - gridSize
			: Math.floor(Math.random() * numberOfTiles);

		while (true) {
			const redRow = Math.floor(redIndex / gridSize);
			const redCol = redIndex % gridSize;

			const isTouchingGreen =
				redIndex === greenIndex ||
				Math.abs(redRow - greenRow) + Math.abs(redCol - greenCol) === 1;

			if (!isTouchingGreen) {
				break;
			}

			redIndex = Math.floor(Math.random() * numberOfTiles);
		}

		tiles[greenIndex] = {
			color: colors.green,
			shyne: false,
		};

		tiles[redIndex] = {
			color: colors.red,
			shyne: false,
		};
	}

	return {
		tiles,
		numColumns: gridSize,
	};
}

function generateRandomPiece(gridSize: number, blackTileProbability: number) {
	const numberOfTiles = gridSize * gridSize;
	const tiles = Array.from({ length: numberOfTiles }, () => ({
		color:
			Math.random() < blackTileProbability ? colors.black : colors.clear,
	}));
	if (!tiles.some((tile) => tile.color === colors.black)) {
		const randomIndex = Math.floor(Math.random() * numberOfTiles);
		tiles[randomIndex].color = colors.black;
	}
	return {
		id: 1,
		tiles,
		numColumns: gridSize,
		placed: false,
	};
}

function generateRandomPieces(numberOfPieces: number, pieceGridSize: number) {
	return {
		pieces: Array.from({ length: numberOfPieces }, (_, index) => ({
			...generateRandomPiece(pieceGridSize, 0.4),
			id: index + 1,
		})),
	};
}

export function randomIntInclusive(lowerBound: number, upperBound: number) {
	return (
		Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
	);
}

export function placePieceOnLevel(
	level: Level,
	id: number,
	position: { row: number; col: number },
): Level {
	const placedPiece = level.pieces.find((piece) => piece.id === id);

	if (!placedPiece) return level;

	const newTiles = [...level.tiles];

	for (let i = 0; i < placedPiece.tiles.length; i++) {
		if (placedPiece.tiles[i].color === colors.clear) {
			continue;
		}

		const row = position.row + Math.floor(i / placedPiece.numColumns);

		const col = position.col + (i % placedPiece.numColumns);

		const TILE_INDEX = row * level.numColumns + col;

		if (
			TILE_INDEX >= level.tiles.length ||
			row < 0 ||
			col < 0 ||
			level.tiles[TILE_INDEX].color === colors.red ||
			level.tiles[TILE_INDEX].color === colors.green ||
			col >= level.numColumns
		) {
			return level;
		}

		if (level.tiles[TILE_INDEX].color === colors.white) {
			newTiles[TILE_INDEX] = {
				...newTiles[TILE_INDEX],
				color: placedPiece.tiles[i].color,
			};
		} else if (level.tiles[TILE_INDEX].color === colors.black) {
			newTiles[TILE_INDEX] = {
				...newTiles[TILE_INDEX],
				color: colors.white,
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
			tile.color === colors.black
				? { ...tile, color: colors.white, shyne: true }
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

function numberOfBlackTilesOnBoard(level: Level): number {
	return level.tiles.filter((tile) => tile.color === colors.black).length;
}

function numberOfBlackTilesOnPieces(level: Level): number {
	return level.pieces.reduce(
		(total, piece) =>
			total +
			piece.tiles.filter((tile) => tile.color === colors.black).length,
		0,
	);
}

export function generateRandomLevel(
	boardGridSize: number,
	numberOfPieces: number,
	pieceGridSize: number,
	mode: "endless" | "campaign" = "endless",
) {
	const placeRedAndGreen = mode === "campaign";

	let pieces = generateRandomPieces(numberOfPieces, pieceGridSize);
	let board = generateRandomBoard(boardGridSize, 0, placeRedAndGreen);

	let level: Level = {
		...board,
		...pieces,
		isUnlocked: false,
	};

	let solution = [];

	let attempts = 0;
	const maxAttempts = 1000;

	while (!isLevelSolved(level) && attempts < maxAttempts) {
		attempts++;

		pieces = generateRandomPieces(numberOfPieces, pieceGridSize);
		board = generateRandomBoard(boardGridSize, 0, placeRedAndGreen);

		level = {
			...board,
			...pieces,
			isUnlocked: false,
		};

		solution = [];

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

					solution.push({
						id: piece.id,
						position,
					});

					break;
				}
			}

			if (!placed) {
			}
		}

		if (isLevelSolved(level) || mode === "endless") {
			if (
				numberOfBlackTilesOnBoard(level) ===
				numberOfBlackTilesOnPieces(level)
			) {
				pieces = generateRandomPieces(numberOfPieces, pieceGridSize);
				board = generateRandomBoard(boardGridSize, 0, placeRedAndGreen);

				level = {
					...board,
					...pieces,
					isUnlocked: false,
				};
				continue;
			}
			break;
		} else {
		}
	}

	if (attempts >= maxAttempts && !isLevelSolved(level)) {
		throw new Error(
			`Could not generate a solvable level after ${maxAttempts} attempts`,
		);
	}

	level = replaceAllBlackTilesWithWhiteAndShynes(level);
	level = resetAllPiecesToUnplaced(level);

	return level;
}

export function getPieceDimensions(piece: Piece) {
	const { tiles, numColumns } = piece;
	const numRows = Math.ceil(tiles.length / numColumns);

	let minRow = numRows;
	let maxRow = -1;
	let minCol = numColumns;
	let maxCol = -1;

	for (let i = 0; i < tiles.length; i++) {
		if (tiles[i].color === colors.clear) continue;

		const row = Math.floor(i / numColumns);
		const col = i % numColumns;

		minRow = Math.min(minRow, row);
		maxRow = Math.max(maxRow, row);
		minCol = Math.min(minCol, col);
		maxCol = Math.max(maxCol, col);
	}

	// No non-clear tiles
	if (maxRow === -1) {
		return {
			width: 0,
			height: 0,
			rowsCroppedTop: 0,
			columnsCroppedLeft: 0,
		};
	}

	return {
		width: maxCol - minCol + 1,
		height: maxRow - minRow + 1,
		rowsCroppedTop: minRow,
		columnsCroppedLeft: minCol,
	};
}

export function randomIntByDifficulty(
	difficulty: number,
	n: number,
	m: number,
): number {
	const value = n + difficulty * (m - n);
	const base = Math.round(value);

	const random = Math.random();

	if (random < 0.1) {
		return Math.max(n, base - 1);
	}

	if (random < 0.9) {
		return base;
	}

	return Math.min(m, base + 1);
}
