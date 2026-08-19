import { NativeModule, registerWebModule } from "expo";

type GameCenterModuleEvents = Record<string, never>;

// GameCenterModule is not available on the web platform.
class GameCenterModule extends NativeModule<GameCenterModuleEvents> {}

export default registerWebModule(GameCenterModule, "GameCenterModule");
