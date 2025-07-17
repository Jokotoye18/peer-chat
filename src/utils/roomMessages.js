export const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const isSameDay = (d1, d2) => {
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};
export const getChatDataWithSeparators = (messages) => {
  if (!messages.length) return [];
  const result = [];
  let lastDate = null;
  let lastMemberId = null;
  messages.forEach((msg, idx) => {
    const msgDate = new Date(msg.timestamp);
    if (!lastDate || !isSameDay(msgDate, lastDate)) {
      result.push({ type: "date", date: msgDate });
      lastDate = msgDate;
      lastMemberId = null;
    }
    const isFirstInGroup =
      msg.memberId !== lastMemberId ||
      result.length === 0 ||
      result[result.length - 1].type === "date";
    result.push({ ...msg, type: "message", isFirstInGroup });
    lastMemberId = msg.memberId;
  });
  return result.reverse();
};

export function formatDateSeparator(date) {
  const d = new Date(date);
  const now = new Date();
  if (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  ) {
    return "Today";
  }
  // Check for yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  ) {
    return "Yesterday";
  }
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
