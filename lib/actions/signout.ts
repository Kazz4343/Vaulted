"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";

export async function signOutAction() {
  await auth.signOut();
  redirect("/");
}
