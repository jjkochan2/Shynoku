import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameCenterModule from "@/modules/game-center/src/GameCenterModule";
import GameButton from "@/src/components/GameButton";
import { getSaveData, SaveData } from "@/src/data/localStorage";
import { colors } from "@/src/theme/colors";

const handleGameCenterPress = async () => {
	try {
		await GameCenterModule.showGameCenter();
	} catch (error) {
		console.error("Game Center error:", error);
	}
};

const styles = StyleSheet.create({
	titleScreen: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.background,
	},

	topSpacer: {
		flex: 1,
		// flexDirection: 'row',
		alignItems: "flex-end",
		// borderWidth: 2,
		paddingHorizontal: 24,
		width: "100%",
	},

	bottomSpacer: {
		flex: 1,
		justifyContent: "center",
	},

	title: {
		flex: 1,
		justifyContent: "center",
	},

	titleText: {
		fontSize: 64,
		color: colors.white,
		fontWeight: "600",
	},

	levelSelectButton: {
		justifyContent: "center",
		backgroundColor: colors.black,
		paddingHorizontal: 32,
		paddingVertical: 8,
		borderRadius: 999,
	},

	levelSelectButtonText: {
		fontSize: 32,
		fontWeight: "600",
		color: colors.white,
	},
});

export default function TitleScreen() {
	const router = useRouter();

	const [saveData, setSaveData] = useState<SaveData | null>(null);
	const [isGameCenterAuthenticated, setIsGameCenterAuthenticated] =
		useState(false);

	useEffect(() => {
		const initialize = async () => {
			const data = await getSaveData();
			setSaveData(data);

			const authenticated = await GameCenterModule.isAuthenticated();
			setIsGameCenterAuthenticated(authenticated);
		};

		initialize();
	}, []);

	useEffect(() => {
		const subscription = GameCenterModule.addListener(
			"onAuthenticated",
			({ playerID }) => {
				console.log("Game Center authenticated:", playerID);
				setIsGameCenterAuthenticated(true);
			},
		);

		return () => subscription.remove();
	}, []);
	useEffect(() => {
		if (!isGameCenterAuthenticated || !saveData) return;
		if (saveData.endlessHighScore < 1) return;

		const updateGameCenterScore = async () => {
			try {
				const gameCenterScore =
					await GameCenterModule.getScore("endless_high_score");
				const localScore = saveData.endlessHighScore;

				if (!gameCenterScore || localScore > gameCenterScore) {
					await GameCenterModule.submitScore(
						localScore,
						"endless_high_score",
					);
					console.log("High score migrated to Game Center!");
				} else {
					console.log("Game Center score already up to date.");
				}
			} catch (error) {
				console.error("Game Center migration failed:", error);
			}
		};

		updateGameCenterScore();
	}, [isGameCenterAuthenticated, saveData]);

	return (
		<SafeAreaView style={styles.titleScreen}>
			<View style={styles.topSpacer}>
				<GameButton
					icon={
						<MaterialIcons
							name="leaderboard"
							size={24}
							color={colors.white}
						/>
					}
					onPress={handleGameCenterPress}
					style={{
						paddingHorizontal: 12,
						paddingVertical: 12,
					}}
				/>
			</View>

			<View style={styles.title}>
				<Text style={styles.titleText}>Shynoku</Text>
			</View>

			<View style={styles.bottomSpacer}>
				<GameButton
					text="Play"
					onPress={() => {
						router.navigate("/levelSelect");
					}}
				/>
			</View>
		</SafeAreaView>
	);
}
