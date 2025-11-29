import React from "react";
import { View, Dimensions } from "react-native";
import { COLORS } from "../app/constants/theme";

export enum CellState {
  White = "white",
  Red = "red",
  Green = "green",
  Black = "black",
  Gray = "gray",
}

export type BoardType = CellState[][];

type Props = {
  board: BoardType;
  maxWidth?: number; // max width for the whole board
  maxHeight?: number; // max height for the whole board
  gap?: number; // spacing between cells
};

export default function Board({ board, maxWidth, maxHeight, gap = 4 }: Props) {
  const screenWidth = Dimensions.get("window").width;
  const width = maxWidth ?? screenWidth - 40; // default padding 20 each side
  const height = maxHeight ?? width; // default square board

  const rows = board.length;
  const cols = board[0]?.length ?? 0;

  // Calculate cell size so board fits into width/height with gaps
  const cellWidth = (width - gap * (cols + 1)) / cols;
  const cellHeight = (height - gap * (rows + 1)) / rows;
  const cellSize = Math.min(cellWidth, cellHeight);

  return (
    <View style={{ padding: gap, backgroundColor: COLORS.background }}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={{
                width: cellSize,
                height: cellSize,
                margin: gap / 2,
                backgroundColor: cell,
                borderRadius: 4,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
