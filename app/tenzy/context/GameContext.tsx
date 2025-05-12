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

export interface GameState {
  score: number;
  gameGridCells: GameGridCell[];
  gameContainerRef: React.RefObject<HTMLDivElement | null>;
  userSelectBoxOrigin: Point | null;
  userSelectBoxRect: Rect | null;
  userSelectedGameGridCells: Set<GameGridCellId>;
  gameStatus: GameLifeCycle;
  timeLeft: number;
  running: boolean;
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
  userSelectedGameGridCells: new Set(),
  gameStatus: GameLifeCycle.WAITING_USER_START,
  timeLeft: GAME_DURATION,
  running: false,
};

export type GameAction =
  | {
      type: "SET_SELECTION_BOX";
      payload: { origin: Point | null; rect: Rect | null };
    }
  | { type: "SET_SELECTED_GAME_GRID_CELLS"; payload: Set<GameGridCellId> }
  | { type: "CONSUME_GAME_GRID_CELLS"; payload: Set<GameGridCellId> }
  | { type: "RESET_SELECTION" }
  | { type: "START_GAME"; payload: { gameGridCells: GameGridCell[] } }
  | { type: "RESET_GAME"; payload: { gameGridCells: GameGridCell[] } }
  | { type: "END_GAME" }
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
        gameGridCells: action.payload.gameGridCells,
        running: true,
      };
    case "RESET_GAME":
      return {
        ...initialState,
        gameStatus: GameLifeCycle.GAME_IN_PROGRESS,
        gameContainerRef: state.gameContainerRef,
        gameGridCells: action.payload.gameGridCells,
        running: true,
      };
    case "END_GAME":
      return {
        ...state,
        gameStatus: GameLifeCycle.GAME_OVER,
        running: false,
      };
    case "SET_SELECTION_BOX":
      return {
        ...state,
        userSelectBoxOrigin: action.payload.origin,
        userSelectBoxRect: action.payload.rect,
      };
    case "SET_SELECTED_GAME_GRID_CELLS":
      return { ...state, userSelectedGameGridCells: action.payload };
    case "CONSUME_GAME_GRID_CELLS":
      return {
        ...state,
        gameGridCells: state.gameGridCells.map((gameGridCell) =>
          action.payload.has(gameGridCell.id)
            ? {
                ...gameGridCell,
                value: getRandomGameGridCellValue(state.gameGridCells),
              }
            : gameGridCell
        ),
        score: state.score + action.payload.size,
      };
    case "TICK":
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      };
    case "RESET_SELECTION":
      return {
        ...state,
        userSelectedGameGridCells: new Set(),
        userSelectBoxOrigin: null,
        userSelectBoxRect: null,
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
      payload: {
        gameGridCells: generateGameGridCells(),
      },
    });
  }
  function handleGameReset() {
    sendGAEvent("event", "tenzy_game_reset", {
      date: new Date().toISOString(),
    });
    dispatch({
      type: "RESET_GAME",
      payload: {
        gameGridCells: generateGameGridCells(),
      },
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
