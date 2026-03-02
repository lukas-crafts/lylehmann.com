const language = "en"; // Fallback, falls keine Konfiguration vorhanden

export const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  language,
  {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  },
);

export const getFormattedDate = (date: Date): string =>
  date ? formatter.format(date) : "";

export const trim = (str = "", ch?: string) => {
  let start = 0;
  let end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const numberFormatter = new Intl.NumberFormat(language, {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

// Function to format a number in thousands (K) or millions (M) format depending on its value
export const toUiAmount = (amount: number) => {
  if (!amount) return "0";

  // Handle rounding edge cases for compact notation
  const absAmount = Math.abs(amount);
  if (absAmount >= 999.5 && absAmount < 1000) {
    return amount > 0 ? "1K" : "-1K";
  }

  return numberFormatter.format(amount);
};
