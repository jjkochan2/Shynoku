import AsyncStorage from "@react-native-async-storage/async-storage";

import { levelData } from "./levelData";

type LevelProgress = {
	allShynesCollected: boolean;
};

export type SaveData = {
	highestUnlockedLevel: number;
	levels: LevelProgress[];
};

export const defaultSaveData: SaveData = {
	highestUnlockedLevel: 1,
	levels: levelData.map(() => ({
		allShynesCollected: false,
	})),
};

const KEY = "saveData";

export async function getSaveData(): Promise<SaveData> {
	const value = await AsyncStorage.getItem(KEY);

	return value ? JSON.parse(value) : defaultSaveData;
}

export async function unlockLevel(levelNumber: number) {
	const saveData = await getSaveData();
	if (levelNumber > saveData.highestUnlockedLevel) {
		saveData.highestUnlockedLevel = levelNumber;
		await AsyncStorage.setItem(KEY, JSON.stringify(saveData));
	}
}

export async function collectAllShynes(levelNumber: number) {
	const saveData = await getSaveData();

	saveData.levels[levelNumber] = {
		...saveData.levels[levelNumber],
		allShynesCollected: true,
	};

	await AsyncStorage.setItem(KEY, JSON.stringify(saveData));
}

export async function resetSaveData() {
	await AsyncStorage.setItem(KEY, JSON.stringify(defaultSaveData));
}

export async function updateSaveData(updater: (saveData: SaveData) => void) {
	const saveData = await getSaveData();

	updater(saveData);

	await AsyncStorage.setItem(KEY, JSON.stringify(saveData));
}
