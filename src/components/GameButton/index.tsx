import { Pressable, StyleProp, Text, ViewStyle } from "react-native";

import { styles } from "./styles";

type GameButtonProps = {
	text?: string;
	onPress: () => void;
	icon?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
};

export default function GameButton({
	text,
	onPress,
	icon,
	style,
}: GameButtonProps) {
	return (
		<Pressable style={[styles.button, style]} onPress={onPress}>
			{icon}
			{text && <Text style={styles.text}>{text}</Text>}
		</Pressable>
	);
}
