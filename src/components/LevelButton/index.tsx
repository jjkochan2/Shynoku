import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";

type Props = {
	levelNumber: number;
	isUnlocked: boolean;
	allShynesCollected: boolean;
};

export default function LevelButton({
	levelNumber,
	isUnlocked,
	allShynesCollected,
}: Props) {
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
			{allShynesCollected && <View style={styles.shyneIndicator} />}
			<Text style={styles.levelButtonText}>{levelNumber + 1}</Text>
		</Pressable>
	);
}
