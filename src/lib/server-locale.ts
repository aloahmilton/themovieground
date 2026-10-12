import { cookies } from "next/headers";
import { isLocale, Locale } from "@/lib/translations";

export async function getUiLocale(): Promise<Locale> {
  const value = (await cookies()).get("ui-locale")?.value;
  return isLocale(value) ? value : "en";
}