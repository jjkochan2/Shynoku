import { NativeModule, requireNativeModule } from "expo";

type GameCenterModuleEvents = {
	onAuthenticated: (event: { playerID: string }) => void;
};

declare class GameCenterModule extends NativeModule<GameCenterModuleEvents> {
	authenticateAsync(): Promise<boolean>;
	getScore(leaderboardID: string): Promise<number | null>;
	isAuthenticated(): Promise<boolean>;
	showGameCenter(): Promise<void>;
	submitScore(score: number, leaderboardID: string): Promise<void>;
}

export default requireNativeModule<GameCenterModule>("GameCenter");
