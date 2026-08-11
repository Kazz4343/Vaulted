import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { auth } from "@/lib/auth";

export default async function UserMenu() {
  const { data: session } = await auth.getSession();

  if (!session?.user) return null;

  // Query your custom userProfile table for the updated username
  const profile = await prisma.userProfile.findFirst({
    where: { email: session.user.email },
    select: { username: true },
  });

  const displayName =
    profile?.username || session.user.email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4">
      {/* Custom Avatar & Username linking to Settings */}
      <Link
        href="/dashboard/setting"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-7 h-7 rounded-full bg-accent-dark/20 text-accent-dark border border-accent-dark/30 flex items-center justify-center font-bold text-xs">
          {initial}
        </div>
        <span className="text-sm font-medium text-gray-200">{displayName}</span>
      </Link>

      {/* Custom Logout Button replacing UserButton */}
      <LogoutButton />
    </div>
  );
}
