import { prisma } from "../prisma";
import { User } from "../type";

export async function getOrCreateUser(neon: {
  email: string;
  username: string;
}) {
  const user = await prisma.userProfile.upsert({
    where: { email: neon.email },
    update: {},
    create: {
      username: neon.username,
      email: neon.email,
    },
  });

  return user;
}
