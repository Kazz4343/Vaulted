"use client";

import { signOutAction } from "@/lib/actions/signout";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOutAction()}
      className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-red-400 bg-zinc-800 hover:bg-zinc-700/80 rounded transition-colors"
    >
      Sign out
    </button>
  );
}
