import React from "react";
import { Text } from "react-native";

type PieceProps = { };

// from SDK 53 (React 19) onwards, forwardRef is no longer needed, as ref is now a prop
export function Piece({ }: PieceProps) {
  return (
    <Text>
        Piece
    </Text>
  );
}