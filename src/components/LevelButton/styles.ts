import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
	lockedLevelButton: {
		backgroundColor: "gray",
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
	shyneIndicator: {
		position: "absolute",
		top: "15%",
		right: "15%",
		width: "20%",
		height: "20%",
		backgroundColor: "aqua",
		borderRadius: 999,
	},
});
