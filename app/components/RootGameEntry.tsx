"use client";
import { useGameContext } from "@/context/GameContext";
import { GameLifeCycle } from "@/types";

import GameContainer from "./GameContainer";
import { StartScreen, ActiveScreen, EndScreen } from "./Screens";

export default function RootGameEntry() {
  const { gameStatus } = useGameContext();

  return (
    <GameContainer>
      {gameStatus === GameLifeCycle.WAITING_USER_START && <StartScreen />}
      {gameStatus === GameLifeCycle.GAME_IN_PROGRESS && <ActiveScreen />}
      {gameStatus === GameLifeCycle.GAME_OVER && <EndScreen />}
    </GameContainer>
  );
}
