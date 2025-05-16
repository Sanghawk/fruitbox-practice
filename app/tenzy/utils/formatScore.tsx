export function formatScore(num: number): string {
  const str = num.toFixed(2);
  return str.replace(/\.?0+$/, "");
}
