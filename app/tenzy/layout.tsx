import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.whileinqueue.io"),
  title: "Tenzy",
  description:
    "Tenzy is a game where you have select numbers on a grid that sum to ten!",
  openGraph: {
    title: "Tenzy",
    description:
      "Tenzy is a game where you have select numbers on a grid that sum to ten!",
    url: "/tenzy",
    siteName: "Tenzy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenzy",
    description:
      "Tenzy is a game where you have select numbers on a grid that sum to ten!",
  },
};

export default function TenzyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TenzyContainer>{children}</TenzyContainer>;
}

function TenzyContainer({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 left-0 h-[calc(100dvh-64px)] max-w-screen-sm mx-auto overflow-y-auto">
      <div className="relative h-full mx-4 sm:mx-auto">{children}</div>
    </div>
  );
}
