import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameCenterModule from "@/modules/game-center/src/GameCenterModule";
import GameButton from "@/src/components/GameButton";
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
		color: "white",
		fontWeight: "600",
	},

	levelSelectButton: {
		justifyContent: "center",
		backgroundColor: "black",
		paddingHorizontal: 32,
		paddingVertical: 8,
		borderRadius: 999,
	},

	levelSelectButtonText: {
		fontSize: 32,
		fontWeight: "600",
		color: "white",
	},
});

export default function TitleScreen() {
	const router = useRouter();

	const [result, setResult] = useState("awaiting test");
	const [testScoreValue, setTestScoreValue] = useState(100);

	const testScore = async () => {
		try {
			const authenticated = await GameCenterModule.authenticateAsync();
			setResult(`Authenticated: ${authenticated}`);

			if (!authenticated) return;

			await GameCenterModule.submitScore(
				testScoreValue,
				"endless_high_score",
			);
			setTestScoreValue(testScoreValue + 1);

			setResult(`SUBMISSION SUCCEEDED: ${testScoreValue}`);
		} catch (error) {
			setResult(`SUBMISSION FAILED: ${String(error)}`);
		}
	};

	return (
		<SafeAreaView style={styles.titleScreen}>
			<View style={styles.topSpacer}>
				<GameButton
					icon={
						<MaterialIcons
							name="leaderboard"
							size={24}
							color="white"
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
				<GameButton
					text={`test endless highscore submission ${testScoreValue}`}
					onPress={testScore}
				/>
				<Text>{result}</Text>
			</View>
		</SafeAreaView>
	);
}
