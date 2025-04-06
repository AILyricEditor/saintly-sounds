export function formatTime(seconds) {
	if (!seconds) return '--:--';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${Math.round(remainingSeconds).toString().padStart(2, '0')}`;
}