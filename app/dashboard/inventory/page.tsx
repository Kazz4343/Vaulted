import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SearchInput from "./SearchInput";
import Link from "next/link";


export default async function Inventory() {
  const { data: session } = await auth.getSession();
  if (!session) {
    redirect("/");
  }

  const items = await prisma.item.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(items);

  return (
    <div className="min-h-screen w-full bg-bgdark p-7 flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Inventory</h1>
      </div>

      {/* Search bar */}
      <div className="flex gap-8">
        <SearchInput placeholder="Search for something?"/>
        <Link href='/dashboard/addItem' 
          className="bg-bg-day flex justify-center items-center 
          rounded-xl text-soft-accent px-2 shadow-sm
          hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all
          duration-300"
        >
          New Item
        </Link>
      </div>

      {/* Item List table */}
      <div>

      </div>
    </div>
  );
}
