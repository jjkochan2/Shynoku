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
];
