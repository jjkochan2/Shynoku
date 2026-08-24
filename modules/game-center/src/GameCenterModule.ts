import { NativeModule, requireNativeModule } from "expo";

type GameCenterModuleEvents = Record<string, never>;

declare class GameCenterModule extends NativeModule<GameCenterModuleEvents> {
	authenticateAsync(): Promise<boolean>;
	showGameCenter(): Promise<void>;
	submitScore(score: number, leaderboardID: string): Promise<void>;
}

export default requireNativeModule<GameCenterModule>("GameCenter");
