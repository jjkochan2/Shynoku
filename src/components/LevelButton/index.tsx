import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";

type Props = {
	levelNumber: number;
	isUnlocked: boolean;
};

export default function LevelButton({ levelNumber, isUnlocked }: Props) {
	if (!isUnlocked) {
		return <View style={styles.lockedLevelButton} />;
	}
	return (
		<Pressable
			style={styles.levelButton}
			onPress={() => {
				router.navigate(`/level/${levelNumber + 1}`);
			}}
		>
			<Text style={styles.levelButtonText}>{levelNumber + 1}</Text>
		</Pressable>
	);
}
