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
});

export default styles;
