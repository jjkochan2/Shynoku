import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { COLORS } from "../constants/theme";
import { useLayoutEffect, useState } from "react";
import { useLevelProgress } from "../../../src/context/LevelProgressContext";
import ResetButton from "../../components/ResetButton";

export default function LevelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const levelNum = Number(id);
  const { unlockLevel } = useLevelProgress();
  const [completed, setCompleted] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Level ${id}`,
      headerStyle: { backgroundColor: COLORS.background },
      headerTintColor: COLORS.primaryDark,
    });
  }, [id]);

  const handleComplete = () => {
    unlockLevel(levelNum + 1); // unlock next level
    setCompleted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level {id}</Text>
      <Pressable
        style={[styles.button, completed && { backgroundColor: COLORS.disabled }]}
        onPress={handleComplete}
        disabled={completed}
      >
        <Text style={styles.buttonText}>{completed ? "Completed" : "Complete Level"}</Text>
      </Pressable>
      <ResetButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 32, color: COLORS.primaryDark, marginBottom: 40 },
  button: { backgroundColor: COLORS.primaryDark, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12 },
  buttonText: { color: "white", fontSize: 18 },
});
