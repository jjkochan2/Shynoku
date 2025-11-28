import { Text, View } from "react-native";
import { Board } from "@/src/components/Board"
import { Piece } from "@/src/components/Piece"
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Level 1</Text>
      <Board></Board>
      <Piece></Piece>
      <Piece></Piece>
      <Piece></Piece>
    </View>
  );
}