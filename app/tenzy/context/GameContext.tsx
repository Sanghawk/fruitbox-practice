"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
  // useEffect,
} from "react";
import { GameGridCell, GameGridCellId, Point, Rect } from "../types";
import {
  generateGameGridCells,
  getRandomGameGridCellValue,
} from "../utils/gameHelpers";

import { GameLifeCycle } from "../types";
import { useSfx } from "../hooks/useSfx";
import { sendGAEvent } from "@next/third-parties/google";
import { useGameTimer } from "../hooks/useGameTimer";
import { GAME_DURATION } from "../constants/config";

interface GameState {
  score: number;
  gameGridCells: GameGridCell[];
  gameContainerRef: React.RefObject<HTMLDivElement | null>;
  userSelectBoxOrigin: Point | null;
  userSelectBoxRect: Rect | null;
  userSelectedGameGridCells: Set<GameGridCellId>;
  gameStatus: GameLifeCycle;
  timeLeft: number;
}

// Extend the state interface to include actions
interface GameContextType extends GameState {
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: () => void;
  handlePointerLeave: () => void;
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
};

type GameAction =
  | {
      type: "SET_SELECTION_BOX";
      payload: { origin: Point | null; rect: Rect | null };
    }
  | { type: "SET_SELECTED_GAME_GRID_CELLS"; payload: Set<GameGridCellId> }
  | { type: "CONSUME_GAME_GRID_CELLS"; payload: Set<GameGridCellId> }
  | { type: "RESET_SELECTION" }
  | { type: "START_GAME"; payload: { gameGridCells: GameGridCell[] } }
  | { type: "RESET_GAME"; payload: { gameGridCells: GameGridCell[] } }
  | { type: "END_GAME" };

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
      };
    case "RESET_GAME":
      return {
        ...initialState,
        gameStatus: GameLifeCycle.GAME_IN_PROGRESS,
        gameContainerRef: state.gameContainerRef,
        gameGridCells: action.payload.gameGridCells,
      };
    case "END_GAME":
      return {
        ...state,
        gameStatus: GameLifeCycle.GAME_OVER,
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
  const {
    timeLeft,
    start: startTimer,
    reset: resetTimer,
  } = useGameTimer({
    duration: GAME_DURATION,
    onExpire: handleGameEnd,
    autoStart: false,
  });
  const playSfx = useSfx();
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    gameContainerRef,
  });

  function handleGameEnd() {
    dispatch({ type: "END_GAME" });
    sendGAEvent("event", "tenzy_game_end", {
      date: new Date().toISOString(),
    });
  }

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
    startTimer();
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
    resetTimer();
  }

  function handlePointerLeave() {
    dispatch({ type: "RESET_SELECTION" });
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || !gameContainerRef.current) return;
    const containerBoundingRect =
      gameContainerRef.current.getBoundingClientRect();

    const originX = e.clientX - containerBoundingRect.left;
    const originY = e.clientY - containerBoundingRect.top;

    dispatch({
      type: "SET_SELECTION_BOX",
      payload: {
        origin: { x: originX, y: originY },
        rect: { left: originX, top: originY, width: 0, height: 0 },
      },
    });
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!state.userSelectBoxOrigin || !gameContainerRef.current) return;
    const containerBoundingRect =
      gameContainerRef.current.getBoundingClientRect();

    const originX = e.clientX - containerBoundingRect.left;
    const originY = e.clientY - containerBoundingRect.top;

    const newRect = {
      left: Math.min(state.userSelectBoxOrigin.x, originX),
      top: Math.min(state.userSelectBoxOrigin.y, originY),
      width: Math.abs(originX - state.userSelectBoxOrigin.x),
      height: Math.abs(originY - state.userSelectBoxOrigin.y),
    };

    // Find intersecting fruits
    const gameGridCellIds = new Set<string>();
    const gameGridCellElements =
      gameContainerRef.current.querySelectorAll<HTMLElement>(
        "[data-selectable='true']"
      );
    gameGridCellElements.forEach((gameGridCellElement) => {
      const gameGridCellBoundingRect =
        gameGridCellElement.getBoundingClientRect();
      const rel = {
        left: gameGridCellBoundingRect.left - containerBoundingRect.left,
        right: gameGridCellBoundingRect.right - containerBoundingRect.left,
        top: gameGridCellBoundingRect.top - containerBoundingRect.top,
        bottom: gameGridCellBoundingRect.bottom - containerBoundingRect.top,
      };
      const intersects = !(
        rel.right < newRect.left ||
        rel.left > newRect.left + newRect.width ||
        rel.bottom < newRect.top ||
        rel.top > newRect.top + newRect.height
      );

      if (intersects) gameGridCellIds.add(gameGridCellElement.id);
    });

    dispatch({
      type: "SET_SELECTION_BOX",
      payload: {
        origin: state.userSelectBoxOrigin,
        rect: newRect,
      },
    });

    dispatch({
      type: "SET_SELECTED_GAME_GRID_CELLS",
      payload: gameGridCellIds,
    });
  }

  function handlePointerUp() {
    const selectedGameGridCells = state.gameGridCells.filter((gameGridCell) =>
      state.userSelectedGameGridCells.has(gameGridCell.id)
    );
    const sum = selectedGameGridCells.reduce(
      (acc, gameGridCell) => acc + gameGridCell.value,
      0
    );

    if (sum === 10) {
      playSfx();
      dispatch({
        type: "CONSUME_GAME_GRID_CELLS",
        payload: state.userSelectedGameGridCells,
      });
      sendGAEvent("event", "tenzy_game_consume", {
        date: new Date().toISOString(),
        grid_cells: Array.from(state.userSelectedGameGridCells),
      });
    }

    dispatch({ type: "RESET_SELECTION" });
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        timeLeft,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerLeave,
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
