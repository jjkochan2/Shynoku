import { Pressable, Text } from "react-native";

import { styles } from "./styles";

type GameButtonProps = {
	text: string;
	onPress: () => void;
};

export default function GameButton({ text, onPress }: GameButtonProps) {
	return (
		<Pressable style={styles.button} onPress={onPress}>
			<Text style={styles.text}>{text}</Text>
		</Pressable>
	);
}
