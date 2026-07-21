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
	},
	boardContainer: {
		flex: 1,
		alignItems: "center",
	},
	backArrow: {
		borderWidth: 2,
		alignSelf: "flex-start",
		paddingLeft: 24,
	},
});

export default styles;
