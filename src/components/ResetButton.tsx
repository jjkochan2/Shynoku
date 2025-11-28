import React from "react";
import { Pressable, Text, StyleSheet, Alert } from "react-native";
import { useLevelProgress } from "../../src/context/LevelProgressContext";
import { COLORS } from "../app/constants/theme";

export default function ResetButton() {
  const { resetProgress } = useLevelProgress();

  const handleReset = () => {
    // optional confirmation
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset all levels? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: () => resetProgress() },
      ]
    );
  };

  return (
    <Pressable style={styles.button} onPress={handleReset}>
      <Text style={styles.text}>Reset Levels</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
