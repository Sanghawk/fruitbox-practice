import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "while in queue | Tenzy Changelog",
  description: "Changelog for Tenzy",
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose dark:prose-invert p-4">{children}</div>;
}
