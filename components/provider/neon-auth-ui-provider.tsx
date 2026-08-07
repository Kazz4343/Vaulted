"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { createAuthClient } from "@neondatabase/auth";

const authClient = createAuthClient({});

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
