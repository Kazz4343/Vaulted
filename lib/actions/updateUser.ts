"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { auth } from "../auth";

export async function updateUser(formData: FormData) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return { error: "Unauthorized: Session not found." };
  }

  const username = formData.get("username") as string;

  if (!username || username.trim().length < 3) {
    return { error: "Username must be at least 3 chracters long." };
  }

  try {
    const existingUsername = await prisma.userProfile.findFirst({
      where: {
        username: username.trim(),
        NOT: { email: session.user.email },
      },
    });

    if (existingUsername) {
      return { error: "Username is already taken." };
    }

    await prisma.userProfile.update({
      where: { email: session.user.email },
      data: { username: username.trim() },
    });

    revalidatePath("/dashboard/setting");
    return { success: "Username updated successfully!" };
  } catch (err) {
    return { er: "Failed to update username. Please try again." };
  }
}
