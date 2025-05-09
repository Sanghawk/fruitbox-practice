/**
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props
 */
"use client";
import { ReactNode } from "react";
import { useGameContext } from "@/app/tenzy/context/GameContext";
import { GameLifeCycle } from "@/app/tenzy/types";

export default function CtxConditionalRenderActiveScreen({
  children,
}: {
  children: ReactNode;
}) {
  const { gameStatus } = useGameContext();

  if (gameStatus === GameLifeCycle.GAME_IN_PROGRESS) return children;

  return null;
}
