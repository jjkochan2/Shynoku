// const boardGridSize = randomIntInclusive(3, 3)
// const numberOfPieces = randomIntInclusive(3, 3)
// const pieceGridSize = randomIntInclusive(2, boardGridSize - 1)
// levels = Array.from({ length: 10 }, () =>
// 	generateRandomLevel(
// 		boardGridSize,
// 		numberOfPieces,
// 		pieceGridSize,
// 		"campaign",
// 	)
// );
import { writeFileSync } from "fs";
import { inspect } from "util";

import { Level } from "@/src/data/levelData";

import { generateRandomLevel, randomIntByDifficulty } from "../src/utils";

let levels: Level[] = [];

const numberOfLevelsToGenerate = 990;
const BOARD_GRID_SIZE_MINIMUM = 4;
const BOARD_GRID_SIZE_MAXIMUM = 7;
const NUMBER_OF_PIECES_MINIMUM = 2;
const NUMBER_OF_PIECES_MAXIMUM = 4;
const PIECE_GRID_SIZE_MINIMUM = 2;

for (let i = 0; i < numberOfLevelsToGenerate; i++) {
	let levelGenerated = false;

	while (!levelGenerated) {
		const difficulty = i / numberOfLevelsToGenerate;

		const boardGridSize = randomIntByDifficulty(
			difficulty,
			BOARD_GRID_SIZE_MINIMUM,
			BOARD_GRID_SIZE_MAXIMUM,
		);

		const numberOfPieces = randomIntByDifficulty(
			difficulty,
			NUMBER_OF_PIECES_MINIMUM,
			NUMBER_OF_PIECES_MAXIMUM,
		);

		const pieceGridSize = randomIntByDifficulty(
			difficulty,
			PIECE_GRID_SIZE_MINIMUM,
			boardGridSize - 1,
		);

		try {
			const level = generateRandomLevel(
				boardGridSize,
				numberOfPieces,
				pieceGridSize,
				"campaign",
			);

			levels.push(level);
			levelGenerated = true;
		} catch (error) {
			// Failed — reroll all parameters and try again
			console.log(error);
		}
	}
}

writeFileSync(
	"newLevels.txt",
	inspect(levels, {
		depth: null,
		colors: false,
		maxArrayLength: null,
	}),
);
