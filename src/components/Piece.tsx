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
	id: number;
	tiles: TileProps[];
	numColumns: number;
	onDrop: (position: { x: number; y: number }) => void;
	onDrag: (position: { x: number; y: number }) => void;
	onDragStart: (id: number) => void;
	placed: boolean;
	isDragging: boolean;
};

const styles = StyleSheet.create({
	piece: {
		flex: 1,
	},
});

export default function Piece({
	id,
	tiles,
	numColumns,
	onDrop,
	onDrag,
	onDragStart,
	isDragging,
	placed,
}: PieceProps) {
	const pan = useRef(new Animated.ValueXY()).current;

	const onDropRef = useRef(onDrop);

	useEffect(() => {
		onDropRef.current = onDrop;
	}, [onDrop]);

	const panResponder = useRef(
		PanResponder.create({
			onPanResponderGrant: () => {
				onDragStart(id);
			},

			onMoveShouldSetPanResponder: () => true,

			onPanResponderMove: (_, gestureState) => {
				onDrag({
					x: gestureState.moveX,
					y: gestureState.moveY,
				});
			},

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
			{...(!placed ? panResponder.panHandlers : {})}
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
						<Tile
							color={placed || isDragging ? "gray" : item.color}
						/>
					)}
					contentContainerStyle={{ flexGrow: 1 }}
				></FlatList>
			</View>
		</Animated.View>
	);
}
