export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose dark:prose-invert p-4">{children}</div>;
}
