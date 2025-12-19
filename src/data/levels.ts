import { CellState } from "../components/Board";
import { PieceType } from "../components/Piece";

// Board colors: Red, Green, White, Black, Gray
// Piece: 1 = black, 0 = transparent

export const levels = [
  {
    id: 1,
    board: [
      [CellState.White, CellState.Green],
      [CellState.Red, CellState.White],
    ],
    pieces: [
      [
        [1],
      ] as PieceType,
    ],
  },
  {
    id: 2,
    board: [
      [CellState.White, CellState.White, CellState.Green],
      [CellState.White, CellState.White, CellState.White],
      [CellState.Red, CellState.White, CellState.White],
    ],
    pieces: [
      [
        [1, 1],
      ] as PieceType,
      [
        [1, 1],
        [0, 1],
      ] as PieceType,
    ],
  },
];
