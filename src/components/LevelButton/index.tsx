import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Level } from "../../data/levelData";
import { styles } from "./styles";

type Props = {
	level: Level;
	levelNumber: number;
};

export default function LevelButton({ level, levelNumber }: Props) {
	const isUnlocked = level.isUnlocked;

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
