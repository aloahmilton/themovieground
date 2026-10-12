import { cookies } from "next/headers";
import { isLocale } from "@/lib/translations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !isLocale(body.locale)) {
    return Response.json({ error: "Unsupported language" }, { status: 400 });
  }

  (await cookies()).set("ui-locale", body.locale, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ locale: body.locale });
}