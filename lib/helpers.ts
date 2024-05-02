import { Currencies } from "@/lib/currencies";

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

export function GetFormatterForCurrency(currency: string) {
  const locale = Currencies.find((c) => c.value === currency)?.locale;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
}

export function formatClassName(className: string) {
  const parts = className
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
  return parts.join(" ");
}
