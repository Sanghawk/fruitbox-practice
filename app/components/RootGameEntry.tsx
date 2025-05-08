"use client";
import { useGameContext } from "@/context/GameContext";
import { GameLifeCycle } from "@/types";

import { GameContainer, ScreenContainer } from "./GameContainer";
import { StartScreen, ActiveScreen, EndScreen } from "./Screens";

export default function RootGameEntry() {
  const { gameStatus } = useGameContext();

  return (
    <div>
      {gameStatus === GameLifeCycle.WAITING_USER_START && (
        <ScreenContainer>
          <StartScreen />
        </ScreenContainer>
      )}
      {gameStatus === GameLifeCycle.GAME_IN_PROGRESS && (
        <GameContainer>
          <ActiveScreen />
        </GameContainer>
      )}
      {gameStatus === GameLifeCycle.GAME_OVER && (
        <ScreenContainer>
          <EndScreen />
        </ScreenContainer>
      )}
    </div>
  );
}
