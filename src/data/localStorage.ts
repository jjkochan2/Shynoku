import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "highestUnlockedLevel";

export async function getHighestUnlockedLevel() {
	const value = await AsyncStorage.getItem(KEY);

	return value ? Number(value) : 1;
}

export async function unlockLevel(levelNumber: number) {
	const current = await getHighestUnlockedLevel();

	if (levelNumber > current) {
		await AsyncStorage.setItem(KEY, levelNumber.toString());
	}
}

export async function resetUnlockedLevels() {
	await AsyncStorage.setItem(KEY, "1");
}
