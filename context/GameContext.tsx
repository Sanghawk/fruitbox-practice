"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { Fruit, FruitId, Point, Rect } from "@/types";
import { generateFruits, getRandomFruitValue } from "@/utils/gameHelpers";
import { GameLifeCycle } from "@/types";
import { GAME_DURATION } from "@/constants/config";
// Define the structure of the dashboard state
interface GameState {
  score: number;
  fruits: Fruit[];
  gameContainerRef: React.RefObject<HTMLDivElement | null>;
  userSelectBoxOrigin: Point | null;
  userSelectBoxRect: Rect | null;
  userSelectedFruits: Set<FruitId>;
  gameStatus: GameLifeCycle;
  intervalRef: React.RefObject<NodeJS.Timeout | null>;
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
const initialState: Omit<GameState, "gameContainerRef" | "intervalRef"> = {
  score: 0,
  fruits: [],
  userSelectBoxOrigin: null,
  userSelectBoxRect: null,
  userSelectedFruits: new Set(),
  gameStatus: GameLifeCycle.WAITING_USER_START,
  timeLeft: GAME_DURATION,
};

type GameAction =
  | {
      type: "SET_SELECTION_BOX";
      payload: { origin: Point | null; rect: Rect | null };
    }
  | { type: "SET_SELECTED_FRUITS"; payload: Set<FruitId> }
  | { type: "CONSUME_FRUITS"; payload: Set<FruitId> }
  | { type: "RESET_SELECTION" }
  | { type: "START_GAME"; payload: { fruits: Fruit[] } }
  | { type: "RESET_GAME"; payload: { fruits: Fruit[] } }
  | { type: "UPDATE_TIME"; payload: number }
  | { type: "END_GAME" };

/**
 * Reducer function for managing state updates.
 * It merges the current state with new partial updates.
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  console.log("Previous State:", state);
  console.log("Action:", action);

  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        gameStatus: GameLifeCycle.GAME_IN_PROGRESS,
        gameContainerRef: state.gameContainerRef,
        intervalRef: state.intervalRef,
        fruits: action.payload.fruits,
        timeLeft: GAME_DURATION,
      };
    case "RESET_GAME":
      return {
        ...initialState,
        gameStatus: GameLifeCycle.GAME_IN_PROGRESS,
        gameContainerRef: state.gameContainerRef,
        intervalRef: state.intervalRef,
        fruits: action.payload.fruits,
        timeLeft: GAME_DURATION,
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
    case "SET_SELECTED_FRUITS":
      return { ...state, userSelectedFruits: action.payload };
    case "CONSUME_FRUITS":
      return {
        ...state,
        fruits: state.fruits.map((fruit) =>
          action.payload.has(fruit.id)
            ? { ...fruit, value: getRandomFruitValue() }
            : fruit
        ),
        score: state.score + action.payload.size,
      };
    case "RESET_SELECTION":
      return {
        ...state,
        userSelectedFruits: new Set(),
        userSelectBoxOrigin: null,
        userSelectBoxRect: null,
      };
    case "UPDATE_TIME":
      return { ...state, timeLeft: action.payload };
    default:
      return state;
  }
}

/**
 * Provides the dashboard context to child components.
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    gameContainerRef,
    intervalRef,
  });

  function startTimer() {
    let t = GAME_DURATION;
    intervalRef.current = setInterval(() => {
      t = t - 1;
      dispatch({
        type: "UPDATE_TIME",
        payload: t <= 1 ? 0 : t,
      });

      if (t <= 1) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    }, 1000);

    /* --- cleanup on unmount OR when `running` toggles off --- */
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }

  useEffect(() => {
    if (state.timeLeft === 0) {
      dispatch({ type: "END_GAME" });
    }
  }, [state.timeLeft]);

  function handleGameStart() {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    dispatch({
      type: "START_GAME",
      payload: {
        fruits: generateFruits(),
      },
    });
    startTimer();
  }
  function handleGameReset() {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    dispatch({
      type: "RESET_GAME",
      payload: {
        fruits: generateFruits(),
      },
    });
    startTimer();
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
    const fruitIds = new Set<string>();
    const fruitElements =
      gameContainerRef.current.querySelectorAll<HTMLElement>(
        "[data-selectable='true']"
      );
    fruitElements.forEach((fruitElement) => {
      const fruitBoundingRect = fruitElement.getBoundingClientRect();
      const rel = {
        left: fruitBoundingRect.left - containerBoundingRect.left,
        right: fruitBoundingRect.right - containerBoundingRect.left,
        top: fruitBoundingRect.top - containerBoundingRect.top,
        bottom: fruitBoundingRect.bottom - containerBoundingRect.top,
      };
      const intersects = !(
        rel.right < newRect.left ||
        rel.left > newRect.left + newRect.width ||
        rel.bottom < newRect.top ||
        rel.top > newRect.top + newRect.height
      );

      if (intersects) fruitIds.add(fruitElement.id);
    });

    dispatch({
      type: "SET_SELECTION_BOX",
      payload: {
        origin: state.userSelectBoxOrigin,
        rect: newRect,
      },
    });

    dispatch({
      type: "SET_SELECTED_FRUITS",
      payload: fruitIds,
    });
  }

  function handlePointerUp() {
    const selectedFruits = state.fruits.filter((fruit) =>
      state.userSelectedFruits.has(fruit.id)
    );
    const sum = selectedFruits.reduce((acc, fruit) => acc + fruit.value, 0);

    if (sum === 10) {
      dispatch({
        type: "CONSUME_FRUITS",
        payload: state.userSelectedFruits,
      });
    }

    dispatch({ type: "RESET_SELECTION" });
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
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
