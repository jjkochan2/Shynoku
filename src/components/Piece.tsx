import React from "react";
import { View } from "react-native";

export type PieceType = (0 | 1)[][]; // 1 = black, 0 = transparent

type Props = {
  piece: PieceType;
  cellSize?: number;
  gap?: number;
};

export default function Piece({ piece, cellSize = 40, gap = 4 }: Props) {
  return (
    <View style={{ padding: gap, backgroundColor: "transparent" }}>
      {piece.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={{
                width: cellSize,
                height: cellSize,
                margin: gap / 2,
                backgroundColor: cell ? "black" : "transparent",
                borderRadius: 4,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
