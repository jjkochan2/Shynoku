import AsyncStorage from "@react-native-async-storage/async-storage";

const LEVEL_KEY = "LEVEL_PROGRESS";

export async function getLevelProgress(): Promise<Set<number>> {
  try {
    const stored = await AsyncStorage.getItem(LEVEL_KEY);
    if (stored) {
      const parsed: number[] = JSON.parse(stored);
      return new Set(parsed);
    }
    return new Set([1]); // default: only level 1 unlocked
  } catch (err) {
    console.error("Error reading level progress:", err);
    return new Set([1]);
  }
}

export async function saveLevelProgress(progress: Set<number>) {
  try {
    await AsyncStorage.setItem(LEVEL_KEY, JSON.stringify(Array.from(progress)));
  } catch (err) {
    console.error("Error saving level progress:", err);
  }
}

export async function unlockNextLevel(currentLevel: number) {
  const progress = await getLevelProgress();
  progress.add(currentLevel + 1);
  await saveLevelProgress(progress);
  return progress;
}
