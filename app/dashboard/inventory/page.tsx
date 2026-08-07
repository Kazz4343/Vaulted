import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SearchInput from "./SearchInput";
import Link from "next/link";
import ItemsTable from "./Itemstable";

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

  // item summary
  const totalItems = items.length;
  const lowstockWarning = items.filter(
    (item) => item.quantity <= item.minQuantity && item.quantity > 0,
  ).length;
  const outofstock = items.filter((item) => item.quantity == 0).length;

  return (
    <div className="min-h-screen w-full bg-bgdark p-7 flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Inventory</h1>
      </div>

      {/* Search bar */}
      <div className="flex gap-8">
        <SearchInput placeholder="Search for something?" />
        <Link
          href="/dashboard/addItem"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm"
        >
          + Add New Item
        </Link>
      </div>

      {/* Item summary  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* total */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-sm text-zinc-400 font-medium">Total Items</span>
          <span className="text-3xl font-bold mt-2">{totalItems}</span>
        </div>

        {/* low stock warning  */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-sm text-zinc-400 font-medium">Low Stock</span>
          <div className="flex items-baseline gap-2 mt-2 justify-between">
            <span className="text-3xl font-bold text-amber-500">
              {lowstockWarning}
            </span>
            <span className="text-xs text-amber-500">Warning</span>
          </div>
        </div>

        {/* out of stock */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-sm text-zinc-400 font-medium">
            Out of stock
          </span>
          <div className="flex items-baseline justify-between gap-2 mt-2">
            <span className="text-3xl font-bold text-red-600">
              {outofstock}
            </span>
            <span className="text-xs text-red-600">Items need restock</span>
          </div>
        </div>
      </div>

      {/* item list table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        {items.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No items found in your inventory. Click `+ New Item` to create one!
          </div>
        ) : (
          <ItemsTable items={items} />
        )}
      </div>
    </div>
  );
}
