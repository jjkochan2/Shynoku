import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

const styles = StyleSheet.create({
	titleScreen: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.background,
	},

	topSpacer: {
		flex: 1,
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
		paddingHorizontal: 12,
		paddingVertical: 6,
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
	return (
		<View style={styles.titleScreen}>
			<View style={styles.topSpacer}></View>

			<View style={styles.title}>
				<Text style={styles.titleText}>Shynoku</Text>
			</View>

			<View style={styles.bottomSpacer}>
				<Pressable
					style={styles.levelSelectButton}
					onPress={() => {
						router.navigate("/levelSelect");
					}}
				>
					<Text style={styles.levelSelectButtonText}>Levels</Text>
				</Pressable>
			</View>
		</View>
	);
}
