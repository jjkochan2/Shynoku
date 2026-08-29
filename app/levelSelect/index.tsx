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
		backgroundColor: colors.black,
		padding: 8,
		borderRadius: 12,
		width: 75,
		margin: 8,
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	levelButtonText: {
		color: colors.white,
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
		color: colors.white,
		fontWeight: "600",
	},
	subTitleText: {
		fontSize: 24,
		color: colors.white,
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
	const LEVELS_PER_PAGE = 20;
	const [page, setPage] = useState(0);
	const maxedOutAccount = false;

	const pageLevels = levelData.slice(
		page * LEVELS_PER_PAGE,
		(page + 1) * LEVELS_PER_PAGE,
	);
	const previousDisabled = page === 0;
	const nextDisabled =
		(page + 1) * LEVELS_PER_PAGE >= saveData.highestUnlockedLevel;

	useFocusEffect(
		useCallback(() => {
			async function load() {
				setSaveData(await getSaveData(maxedOutAccount));
			}

			load();
		}, [maxedOutAccount]),
	);
	return (
		<SafeAreaView style={styles.levelSelectScreen}>
			<View style={styles.title}>
				<View style={styles.backArrow}>
					<Pressable onPress={() => router.navigate("/title")}>
						<Ionicons
							name="chevron-back"
							size={28}
							color={colors.white}
						/>
					</Pressable>
				</View>
				<Text style={styles.titleText}>Levels</Text>
			</View>
			<View style={styles.levelSelectGrid}>
				<FlatList
					data={pageLevels}
					numColumns={4}
					scrollEnabled={false}
					keyExtractor={(_, index) =>
						(page * LEVELS_PER_PAGE + index).toString()
					}
					renderItem={({ index }) => {
						const levelIndex = page * LEVELS_PER_PAGE + index;

						return (
							<LevelButton
								levelNumber={levelIndex}
								isUnlocked={
									levelIndex + 1 <=
									saveData.highestUnlockedLevel
								}
								allShynesCollected={
									saveData.levels[levelIndex]
										.allShynesCollected
								}
							/>
						);
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					paddingHorizontal: 24,
				}}
			>
				<Pressable
					onPress={() => setPage(page - 1)}
					disabled={previousDisabled}
					style={{ opacity: previousDisabled ? 0 : 1 }}
				>
					<Ionicons
						name="chevron-back"
						size={28}
						color={colors.white}
					/>
				</Pressable>

				<Pressable
					onPress={() => setPage(page + 1)}
					disabled={nextDisabled}
					style={{ opacity: nextDisabled ? 0 : 1 }}
				>
					<Ionicons
						name="chevron-forward"
						size={28}
						color={colors.white}
					/>
				</Pressable>
			</View>
			{/* <View>
				<GameButton
					text="Random Level"
					onPress={() => {
						router.navigate("/level/random")
					}}
				/>
			</View> */}
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
