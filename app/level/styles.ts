import { StyleSheet } from "react-native";

import { colors } from "@/src/theme/colors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: colors.background,
		alignItems: "center",
		gap: 24,
	},
	title: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 24,
	},
	titleText: {
		color: "white",
		fontSize: 24,
		fontWeight: 600,
	},
	piecesContainer: {
		flex: 1,
		aspectRatio: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 24,
	},
	boardContainer: {
		flex: 1,
		alignItems: "center",
	},
	navigationBar: {
		width: "100%",
		paddingHorizontal: 24,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	nextLevelContainer: {
		position: "absolute",
		top: "70%",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: colors.darkBlue,
		borderRadius: 24,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	nextLevelText: {
		color: "white",
		fontWeight: 600,
	},
});

export default styles;
