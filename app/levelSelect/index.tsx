import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { levelData } from "@/src/data/levelData";
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
	titleTextContainer: {
		borderWidth: 2,
	},
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
	return (
		<SafeAreaView style={styles.levelSelectScreen}>
			<View style={styles.title}>
				<View style={styles.backArrow}>
					<Pressable onPress={() => router.back()}>
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
		</SafeAreaView>
	);
}
