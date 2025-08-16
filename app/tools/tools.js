import { usePathname } from "next/navigation";

export function formatTime(seconds) {
	if (!seconds == null || isNaN(seconds)) return '--:--';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${Math.round(remainingSeconds).toString().padStart(2, '0')}`;
}

export function getClientX(e) {
  if (e.touches && e.touches[0]) {
    return e.touches[0].clientX;
  } else if (e.changedTouches && e.changedTouches[0]) {
    return e.changedTouches[0].clientX;
  } else if (typeof e.clientX === 'number') {
    return e.clientX;
  }
  return 0; // fallback
}

export function isOnPage(targetHref, exceptions = []) {
  const pathname = usePathname();

  if (exceptions.includes(pathname)) return false;

  return pathname === targetHref || pathname.startsWith(`${targetHref}/`);
}