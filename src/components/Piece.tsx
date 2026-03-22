import Board from "./Board";
import { TileProps } from "./Tile";

type PieceProps = {
    tiles: TileProps[]
    numColumns: number
}

export default function Piece({ tiles, numColumns}: PieceProps) {
    return (
        <Board
            tiles={tiles}
            numColumns={numColumns}
        />
    )
}