export function isDaytime() {
  const now = new Date();
  const hour = now.getHours(); // 0 - 23
  return hour >= 6 && hour < 18;
}
