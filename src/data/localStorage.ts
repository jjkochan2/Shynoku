import AsyncStorage from "@react-native-async-storage/async-storage";

import { levelData } from "./levelData";

type LevelProgress = {
	allShynesCollected: boolean;
};

export type SaveData = {
	highestUnlockedLevel: number;
	levels: LevelProgress[];
	endlessHighScore: number;
};

export const defaultSaveData: SaveData = {
	highestUnlockedLevel: 1,
	levels: levelData.map(() => ({
		allShynesCollected: false,
	})),
	endlessHighScore: 0,
};

export const maxedSavaData: SaveData = {
	highestUnlockedLevel: levelData.length,
	levels: levelData.map(() => ({
		allShynesCollected: true,
	})),
	endlessHighScore: 0,
};

const KEY = "saveData";

export async function getSaveData(max: boolean = false): Promise<SaveData> {
	if (max) {
		return maxedSavaData;
	}
	const value = await AsyncStorage.getItem(KEY);

	if (!value) {
		return defaultSaveData;
	}

	const savedData: Partial<SaveData> = JSON.parse(value);

	return {
		...defaultSaveData,
		...savedData,
		levels: defaultSaveData.levels.map(
			(defaultLevel, index) => savedData.levels?.[index] ?? defaultLevel,
		),
	};
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
