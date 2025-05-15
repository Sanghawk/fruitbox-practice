"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { GameGridCell, GameGridCellId, Point, Rect } from "../types";
import {
  generateGameGridCells,
  getRandomGameGridCellValue,
} from "../utils/gameHelpers";

import { GameLifeCycle } from "../types";
import { useSfx } from "../hooks/useSfx";
import { sendGAEvent } from "@next/third-parties/google";
import { GAME_DURATION } from "../constants/config";
import { useDragSelect } from "../hooks/useDragSelect";
import { scoringStrategy } from "../scoring";

// TODO: move this into types
export interface GameState {
  score: number;
  gameGridCells: GameGridCell[];
  gameContainerRef: React.RefObject<HTMLDivElement | null>;
  userSelectBoxOrigin: Point | null;
  userSelectBoxRect: Rect | null;
  userSelectedGameGridCellIds: Set<GameGridCellId>;
  gameStatus: GameLifeCycle;
  timeLeft: number;
  running: boolean;
  duration: number;
}

// Extend the state interface to include actions
interface GameContextType extends GameState {
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: () => void;
  handlePointerLeave: () => void;
  handlePointerCancel: () => void;
  handleGameStart: () => void;
  handleGameReset: () => void;
}

// Create a context with an undefined default value
const GameContext = createContext<GameContextType | undefined>(undefined);

// Define the initial state of the dashboard
const initialState: Omit<GameState, "gameContainerRef"> = {
  score: 0,
  gameGridCells: [],
  userSelectBoxOrigin: null,
  userSelectBoxRect: null,
  userSelectedGameGridCellIds: new Set(),
  gameStatus: GameLifeCycle.WAITING_USER_START,
  timeLeft: GAME_DURATION,
  running: false,
  duration: GAME_DURATION,
};

export type GameAction =
  | { type: "START_GAME" }
  | { type: "RESET_GAME" }
  | { type: "END_GAME" }
  | {
      type: "START_SELECTION";
      payload: {
        userSelectBoxOrigin: Point | null;
        userSelectBoxRect: Rect | null;
      };
    }
  | {
      type: "UPDATE_SELECTION";
      payload: {
        userSelectBoxOrigin: Point | null;
        userSelectBoxRect: Rect | null;
        userSelectedGameGridCellIds: Set<GameGridCellId>;
      };
    }
  | {
      type: "SUBMIT_SELECTION";
      payload: {
        userSelectedGameGridCells: GameGridCell[];
      };
    }
  | { type: "RESET_SELECTION" }
  | { type: "TICK" };

/**
 * Reducer function for managing state updates.
 * It merges the current state with new partial updates.
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        gameStatus: GameLifeCycle.GAME_IN_PROGRESS,
        gameContainerRef: state.gameContainerRef,
        gameGridCells: generateGameGridCells(),
        running: true,
      };
    case "RESET_GAME":
      return {
        ...initialState,
        gameStatus: GameLifeCycle.GAME_IN_PROGRESS,
        gameContainerRef: state.gameContainerRef,
        gameGridCells: generateGameGridCells(),
        running: true,
      };
    case "END_GAME":
      return {
        ...state,
        gameStatus: GameLifeCycle.GAME_OVER,
        running: false,
      };
    case "START_SELECTION":
      return {
        ...state,
        userSelectedGameGridCellIds: new Set(),
        userSelectBoxOrigin: action.payload.userSelectBoxOrigin,
        userSelectBoxRect: action.payload.userSelectBoxRect,
      };
    case "UPDATE_SELECTION":
      return {
        ...state,
        userSelectBoxOrigin: action.payload.userSelectBoxOrigin,
        userSelectBoxRect: action.payload.userSelectBoxRect,
        userSelectedGameGridCellIds: action.payload.userSelectedGameGridCellIds,
      };
    case "RESET_SELECTION":
      return {
        ...state,
        userSelectedGameGridCellIds: new Set(),
        userSelectBoxOrigin: null,
        userSelectBoxRect: null,
      };
    case "SUBMIT_SELECTION":
      const pointsEarned = scoringStrategy.pointsForClear(
        action.payload.userSelectedGameGridCells
      );
      return {
        ...state,
        gameGridCells: state.gameGridCells.map((cell) =>
          // refill selected cells
          state.userSelectedGameGridCellIds.has(cell.id)
            ? {
                ...cell,
                value: getRandomGameGridCellValue(state.gameGridCells),
              }
            : cell
        ),
        score: state.score + pointsEarned,
        userSelectedGameGridCellIds: new Set(),
        userSelectBoxOrigin: null,
        userSelectBoxRect: null,
      };

    case "TICK":
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      };

    default:
      return state;
  }
}

/**
 * Provides the dashboard context to child components.
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    gameContainerRef,
  });
  const playSfx = useSfx();

  // Use custom hook for drag-select (pointer events) logic
  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    handlePointerCancel,
  } = useDragSelect({
    gameContainerRef,
    dispatch,
    state,
    playSfx,
  });

  useEffect(() => {
    if (!state.running) return;
    const timerId = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(timerId);
  }, [state.running, dispatch]);

  useEffect(() => {
    if (state.running && state.timeLeft <= 0) {
      dispatch({ type: "END_GAME" });
      sendGAEvent("event", "tenzy_game_end", {
        date: new Date().toISOString(),
      });
    }
  }, [state.running, state.timeLeft, dispatch]);

  function handleGameStart() {
    sendGAEvent("event", "tenzy_game_start", {
      date: new Date().toISOString(),
    });
    dispatch({
      type: "START_GAME",
    });
  }
  function handleGameReset() {
    sendGAEvent("event", "tenzy_game_reset", {
      date: new Date().toISOString(),
    });
    dispatch({
      type: "RESET_GAME",
    });
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerLeave,
        handlePointerCancel,
        handleGameStart,
        handleGameReset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

/**
 * Custom hook to access the game context.
 * @returns The game context.
 * @throws Error if used outside of a `GameProvider`.
 */
export function useGameContext(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
