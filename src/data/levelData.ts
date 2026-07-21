export type Tile = {
	color: string;
	shyne?: boolean;
};

type Piece = {
	id: number;
	tiles: Tile[];
	numColumns: number;
	placed: boolean;
};

export type Level = {
	tiles: Tile[];
	numColumns: number;
	pieces: Piece[];
};

export const levelData: Level[] = [
	{
		tiles: [
			{ color: "white" },
			{ color: "red" },
			{ color: "green" },
			{ color: "white", shyne: true },
		],
		numColumns: 2,
		pieces: [
			{
				id: 1,
				tiles: [{ color: "black" }],
				numColumns: 1,
				placed: false,
			},
		],
	},
	{
		tiles: [
			{ color: "white" },
			{ color: "white" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "white" },
			{ color: "red" },
			{ color: "white" },
			{ color: "white" },
		],
		numColumns: 3,
		pieces: [
			{
				id: 1,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
				placed: false,
			},
			{
				id: 2,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "clear" },
				],
				numColumns: 2,
				placed: false,
			},
			{
				id: 3,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
				placed: false,
			},
			{
				id: 4,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "clear" },
				],
				numColumns: 2,
				placed: false,
			},
		],
	},
	{
		tiles: [
			{ color: "white" },
			{ color: "red" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "red" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "red" },
			{ color: "green" },
			{ color: "white" },
			{ color: "white" },
			{ color: "black" },
			{ color: "green" },
			{ color: "white" },
		],
		numColumns: 4,
		pieces: [
			{
				id: 1,
				tiles: [
					{ color: "black" },
					{ color: "clear" },
					{ color: "black" },
					{ color: "black" },
				],
				numColumns: 2,
				placed: false,
			},
		],
	},
];
