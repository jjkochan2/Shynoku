import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "./constants/theme";
import { useLevelProgress } from "../../src/context/LevelProgressContext";

const TOTAL_LEVELS = 30;
const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING = 20;
const GAP = 12;
const NUM_COLS = 3;
const LEVEL_SIZE = (SCREEN_WIDTH - PADDING * 2 - GAP * (NUM_COLS - 1)) / NUM_COLS;

export default function LevelSelect() {
  const router = useRouter();
  const { unlocked } = useLevelProgress();

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.grid}>
        {Array.from({ length: TOTAL_LEVELS }).map((_, index) => {
          const level = index + 1;
          const isUnlocked = unlocked.has(level);
          return (
            <Pressable
              key={level}
              disabled={!isUnlocked}
              onPress={() => router.push(`/level/${level}`)}
              style={[
                styles.levelBox,
                { width: LEVEL_SIZE, height: LEVEL_SIZE },
                { backgroundColor: isUnlocked ? COLORS.primaryDark : COLORS.disabled },
              ]}
            >
              <Text style={styles.levelText}>{level}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: PADDING, alignItems: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: GAP },
  levelBox: { borderRadius: 12, justifyContent: "center", alignItems: "center" },
  levelText: { color: "white", fontSize: 20 },
});
