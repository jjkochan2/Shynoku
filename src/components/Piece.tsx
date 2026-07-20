import { useEffect, useRef } from "react";
import {
	Animated,
	FlatList,
	PanResponder,
	StyleSheet,
	View,
} from "react-native";

import Tile, { TileProps } from "./Tile";

type PieceProps = {
	tiles: TileProps[];
	numColumns: number;
	onDrop: (position: { x: number; y: number }) => void;
	placed: boolean;
};

const styles = StyleSheet.create({
	piece: {
		flex: 1,
		borderWidth: 2,
		borderColor: "red",
	},
});

export default function Piece({
	tiles,
	numColumns,
	onDrop,
	placed,
}: PieceProps) {
	const pan = useRef(new Animated.ValueXY()).current;

	const onDropRef = useRef(onDrop);

	useEffect(() => {
		onDropRef.current = onDrop;
	}, [onDrop]);

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,

			onPanResponderMove: Animated.event(
				[
					null,
					{
						dx: pan.x,
						dy: pan.y,
					},
				],
				{ useNativeDriver: false },
			),

			onPanResponderRelease: (_, gestureState) => {
				onDropRef.current({
					x: gestureState.moveX,
					y: gestureState.moveY,
				});
				pan.setValue({ x: 0, y: 0 });
			},
		}),
	).current;

	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={{
				transform: [{ translateX: pan.x }, { translateY: pan.y }],
			}}
		>
			<View style={styles.piece}>
				<FlatList
					data={tiles}
					numColumns={numColumns}
					scrollEnabled={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => (
						<Tile color={placed ? "gray" : item.color} />
					)}
					contentContainerStyle={{ flexGrow: 1 }}
				></FlatList>
			</View>
		</Animated.View>
	);
}
