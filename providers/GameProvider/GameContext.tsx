"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
  useEffect,
} from "react";
type Point = {
  x: number;
  y: number;
};

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};
type FruitId = string;
export type Fruit = {
  id: FruitId;
  value: number;
  col: number;
  row: number;
  consumed: boolean;
}; // Define the structure of the dashboard state
interface GameState {
  score: number;
  fruits: Fruit[];
  gameContainerRef: React.RefObject<HTMLDivElement | null>;
  userSelectBoxOrigin: Point | null;
  userSelectBoxRect: Rect | null;
  userSelectedFruits: Set<FruitId>;
}

// Extend the state interface to include actions
interface GameContextType extends GameState {
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: () => void;
  handlePointerLeave: () => void;
}

// Create a context with an undefined default value
const GameContext = createContext<GameContextType | undefined>(undefined);

// Define the initial state of the dashboard
const initialState: Omit<GameState, "gameContainerRef"> = {
  score: 0,
  fruits: [],
  userSelectBoxOrigin: null,
  userSelectBoxRect: null,
  userSelectedFruits: new Set(),
};

/**
 * Reducer function for managing state updates.
 * It merges the current state with new partial updates.
 */
function gameReducer(state: GameState, action: Partial<GameState>) {
  return { ...state, ...action };
}

/**
 * Provides the dashboard context to child components.
 */
export function GameProvider({
  children,
  col,
  row,
}: {
  children: ReactNode;
  col: number;
  row: number;
}) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    gameContainerRef,
  });

  // Initialize fruits on client-side only
  useEffect(() => {
    dispatch({
      fruits: Array.from({ length: row * col }, (_, index) => ({
        id: `fruit-${index}`,
        value: Math.floor(Math.random() * 9) + 1,
        col: index % col,
        row: Math.floor(index / col),
        consumed: false,
      })),
    });
  }, [row, col]);

  useEffect(() => {
    if (!state.userSelectBoxRect || !gameContainerRef.current) return;
    const rect = state.userSelectBoxRect;
    const fruitIds = new Set<string>();
    const containerBoundingRect =
      gameContainerRef.current.getBoundingClientRect();

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
        rel.right < rect.left ||
        rel.left > rect.left + rect.width ||
        rel.bottom < rect.top ||
        rel.top > rect.top + rect.height
      );

      if (intersects) fruitIds.add(fruitElement.id);
    });

    dispatch({
      userSelectedFruits: fruitIds,
    });
  }, [state.userSelectBoxRect]);
  function handlePointerLeave() {
    dispatch({
      userSelectBoxOrigin: null,
      userSelectBoxRect: null,
    });
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || !gameContainerRef.current) return;
    const containerBoundingRect =
      gameContainerRef.current.getBoundingClientRect();

    const originX = e.clientX - containerBoundingRect.left;
    const originY = e.clientY - containerBoundingRect.top;
    // Set the origin and rect
    dispatch({
      userSelectBoxOrigin: {
        x: originX,
        y: originY,
      },
      userSelectBoxRect: {
        left: originX,
        top: originY,
        width: 0,
        height: 0,
      },
    });
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    // If not selecting or no origin or no container, do nothing
    if (!state.userSelectBoxOrigin || !gameContainerRef.current) return;
    const containerBoundingRect =
      gameContainerRef.current.getBoundingClientRect();

    const originX = e.clientX - containerBoundingRect.left;
    const originY = e.clientY - containerBoundingRect.top;
    // Update the rect
    dispatch({
      userSelectBoxRect: {
        left: Math.min(state.userSelectBoxOrigin.x, originX),
        top: Math.min(state.userSelectBoxOrigin.y, originY),
        width: Math.abs(originX - state.userSelectBoxOrigin.x),
        height: Math.abs(originY - state.userSelectBoxOrigin.y),
      },
    });
  }
  function handlePointerUp() {
    dispatch({
      userSelectBoxOrigin: null,
      userSelectBoxRect: null,
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
