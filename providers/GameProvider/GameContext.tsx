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

type GameAction =
  | { type: "SET_FRUITS"; payload: Fruit[] }
  | {
      type: "SET_SELECTION_BOX";
      payload: { origin: Point | null; rect: Rect | null };
    }
  | { type: "SET_SELECTED_FRUITS"; payload: Set<FruitId> }
  | { type: "CONSUME_FRUITS"; payload: Set<FruitId> }
  | { type: "RESET_SELECTION" };

/**
 * Reducer function for managing state updates.
 * It merges the current state with new partial updates.
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  console.log("Previous State:", state);
  console.log("Action:", action);

  switch (action.type) {
    case "SET_FRUITS":
      return { ...state, fruits: action.payload };
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
          action.payload.has(fruit.id) ? { ...fruit, consumed: true } : fruit
        ),
      };
    case "RESET_SELECTION":
      return {
        ...state,
        userSelectedFruits: new Set(),
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
      type: "SET_FRUITS",
      payload: Array.from({ length: row * col }, (_, index) => ({
        id: `fruit-${index}`,
        value: Math.floor(Math.random() * 9) + 1,
        col: index % col,
        row: Math.floor(index / col),
        consumed: false,
      })),
    });
  }, [row, col]);

  function handlePointerLeave() {
    console.log("Pointer Leave Event");
    dispatch({ type: "RESET_SELECTION" });
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    console.log("Pointer Down Event");
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
    console.log("Pointer Up Event");
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
