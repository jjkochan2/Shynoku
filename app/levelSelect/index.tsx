import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

import { levelData } from "../level/[id]";

const styles = StyleSheet.create({
	levelSelectScreen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.background,
	},
	levelButton: {
		backgroundColor: "black",
		padding: "3%",
		borderRadius: 12,
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
		flex: 1,
		justifyContent: "center",
	},
});

export default function LevelSelectScreen() {
	const router = useRouter();
	return (
		<View style={styles.levelSelectScreen}>
			<View style={styles.title}>
				<Text>Level Select Screen</Text>
			</View>
			<View style={styles.levelSelectGrid}>
				<FlatList
					data={levelData}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ index }) => (
						<Pressable
							style={styles.levelButton}
							onPress={() => {
								router.navigate(`/level/${index + 1}`);
							}}
						>
							<Text style={styles.levelButtonText}>
								{index + 1}
							</Text>
						</Pressable>
					)}
				/>
			</View>
		</View>
	);
}
