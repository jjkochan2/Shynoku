import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameButton from "@/src/components/GameButton";
import LevelButton from "@/src/components/LevelButton";
import { levelData } from "@/src/data/levelData";
import {
	defaultSaveData,
	getSaveData,
	SaveData,
} from "@/src/data/localStorage";
import { colors } from "@/src/theme/colors";

const styles = StyleSheet.create({
	levelSelectScreen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.background,
		gap: 12,
	},
	levelButton: {
		backgroundColor: "black",
		padding: 8,
		borderRadius: 12,
		width: 75,
		margin: 8,
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	levelButtonText: {
		color: "white",
		fontWeight: "600",
		fontSize: 24,
	},
	levelSelectGrid: {
		flex: 1,
	},
	title: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	titleText: {
		fontSize: 32,
		color: "white",
		fontWeight: "600",
	},
	subTitleText: {
		fontSize: 24,
		color: "white",
		fontWeight: "400",
	},
	titleTextContainer: {},
	backArrow: {
		position: "absolute",
		left: 16,
		top: 0,
		bottom: 0,
		justifyContent: "center",
	},
});

export default function LevelSelectScreen() {
	const router = useRouter();
	const [saveData, setSaveData] = useState<SaveData>(defaultSaveData);

	useFocusEffect(
		useCallback(() => {
			async function load() {
				setSaveData(await getSaveData());
			}

			load();
		}, []),
	);
	return (
		<SafeAreaView style={styles.levelSelectScreen}>
			<View style={styles.title}>
				<View style={styles.backArrow}>
					<Pressable onPress={() => router.navigate("/title")}>
						<Ionicons name="chevron-back" size={28} color="white" />
					</Pressable>
				</View>
				<Text style={styles.titleText}>Levels</Text>
			</View>
			<View style={styles.levelSelectGrid}>
				<FlatList
					data={levelData}
					numColumns={4}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ index }) => (
						<LevelButton
							levelNumber={index}
							isUnlocked={
								index + 1 <= saveData.highestUnlockedLevel
							}
							allShynesCollected={
								saveData.levels[index].allShynesCollected
							}
						/>
					)}
				/>
			</View>
			<GameButton
				text="Endless Mode"
				onPress={() => {
					router.navigate("/level/endless");
				}}
			/>
			<View
				style={{
					flexDirection: "row",
					gap: 8,
					alignItems: "center",
				}}
			>
				<MaterialCommunityIcons name="crown" size={32} color="gold" />
				<Text style={styles.subTitleText}>
					High score: {saveData.endlessHighScore ?? 0}
				</Text>
			</View>
			{/* <Pressable
				style={{
					backgroundColor: 'white'
				}}
				onPress={() => {
					resetSaveData()
				}}
			>
				<Text>
					Reset all level data
				</Text>
			</Pressable> */}
		</SafeAreaView>
	);
}
