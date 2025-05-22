import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const getShortRelativeTime = (fromTime: Date) => {
  const now = dayjs();
  const then = dayjs(fromTime);
  const diffSeconds = now.diff(then, "second");
  const diffMinutes = now.diff(then, "minute");
  const diffHours = now.diff(then, "hour");
  const diffDays = now.diff(then, "day");
  const diffWeeks = now.diff(then, "week");
  const diffMonths = now.diff(then, "month");
  const diffYears = now.diff(then, "year");

  if (diffSeconds < 60) return `${diffSeconds}s`;
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  if (diffWeeks < 4) return `${diffWeeks}w`;
  if (diffMonths < 12) return `${diffMonths}mo`;
  return `${diffYears}y`;
};
