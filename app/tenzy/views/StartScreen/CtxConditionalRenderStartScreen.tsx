/**
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props
 */
"use client";
import { ReactNode } from "react";
import { useGameContext } from "@/app/tenzy/context/GameContext";
import { GameLifeCycle } from "@/app/tenzy/types";

export default function CtxConditionalRenderStartScreen({
  children,
}: {
  children: ReactNode;
}) {
  const { gameStatus } = useGameContext();

  if (gameStatus === GameLifeCycle.WAITING_USER_START) return children;

  return null;
}
