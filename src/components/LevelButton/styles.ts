import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
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
	lockedLevelButton: {
		backgroundColor: colors.gray,
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
	shyneIndicator: {
		position: "absolute",
		top: "15%",
		right: "15%",
		width: "20%",
		height: "20%",
		backgroundColor: colors.aqua,
		borderRadius: 999,
	},
});
