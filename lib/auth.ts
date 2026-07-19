import { createNeonAuth } from "@neondatabase/auth/next/server";
import { getOrCreateUser } from "./db/db";
import { User } from "./type";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

// Get user Function

export async function getUserSession(): Promise<User | null> {
  const { data: session } = await auth.getSession();
  if (!session) return null;

  return getOrCreateUser({
    username: session.user.name,
    email: session.user.email,
  });
}
