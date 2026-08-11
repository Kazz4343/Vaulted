import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingForm from "./SettingForm";

export default async function SettingPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  // Fetch the user's current profile from Neon database via Prisma
  const userProfile = await prisma.userProfile.findFirst({
    where: { email: session.user.email },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-400">
          Manage your account preferences and profile info.
        </p>
      </div>

      {/* Profile Section */}
      <div className="border border-gray-800 rounded-lg p-6 bg-zinc-900/50 space-y-6">
        <h2 className="text-lg font-semibold text-gray-200">
          Profile Settings
        </h2>

        <SettingForm initialUsername={userProfile?.username || ""} />
      </div>

      {/* Account Info (Read-Only) */}
      <div className="border border-gray-800 rounded-lg p-6 bg-zinc-900/50 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Account Details</h2>

        <div className="grid grid-cols-1 gap-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-gray-400">
              User ID
            </label>
            <p className="font-mono text-gray-300 mt-1">
              {userProfile?.id || session.user.id}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400">
              Email Address
            </label>
            <p className="text-gray-300 mt-1">
              {userProfile?.email || session.user.email}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400">
              Account Created
            </label>
            <p className="text-gray-300 mt-1">
              {userProfile?.createdAt
                ? new Date(userProfile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
