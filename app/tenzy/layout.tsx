import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "while in queue | Tenzy",
  description:
    "Tenzy is a game where you have select numbers on a grid that sum to ten!",
};

export default function TenzyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TenzyContainer>{children}</TenzyContainer>;
}

function TenzyContainer({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto max-w-screen-sm">{children}</div>;
}
