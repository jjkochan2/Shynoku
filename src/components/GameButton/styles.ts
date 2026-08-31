import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.black,
		paddingHorizontal: 32,
		paddingVertical: 8,
		borderRadius: 999,
	},
	text: {
		fontSize: 32,
		fontWeight: "600",
		color: colors.white,
	},
});
