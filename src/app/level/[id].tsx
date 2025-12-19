import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Board from "../../components/Board";
import Piece from "../../components/Piece";
import { levels } from "../../../src/data/levels";
import { COLORS } from "../../app/constants/theme";

export default function LevelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const levelId = parseInt(id, 10);

  const levelData = levels.find((l) => l.id === levelId);

  if (!levelData) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Text style={{ color: COLORS.primaryDark }}>Level not found</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Level {levelData.id}</Text>

        <Board board={levelData.board}/>

        <Text style={styles.subtitle}>Pieces:</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {levelData.pieces.map((p, i) => (
            <Piece key={i} piece={p}/>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background, alignItems: "center" },
  title: { fontSize: 32, color: COLORS.primaryDark, marginBottom: 20 },
  subtitle: { fontSize: 24, color: COLORS.primaryDark, marginTop: 20 },
});
