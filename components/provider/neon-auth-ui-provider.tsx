"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { createAuthClient } from "@neondatabase/auth";

const authClient = createAuthClient(
  process.env.NEXT_PUBLIC_NEON_AUTH_BASE_URL ||
    process.env.NEON_AUTH_BASE_URL ||
    "",
);

export default function NeonAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NeonAuthUIProvider authClient={authClient} defaultTheme="dark">
      {children}
    </NeonAuthUIProvider>
  );
}
