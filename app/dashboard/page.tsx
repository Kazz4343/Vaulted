// app/dashboard/page.tsx
import { getDashboardData } from "@/lib/actions/dashboard";
import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const user = await getUserSession();

  if (!user || !user.email) {
    redirect("/");
  }

  const data = await getDashboardData(user.email);

  return (
    <div className="min-h-screen w-full bg-bgdark p-7 flex flex-col gap-8 text-zinc-100">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Welcome back, {user.username || "User"}
          </p>
        </div>
        <Link
          href="/dashboard/addItem"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm"
        >
          + Add New Item
        </Link>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Unique Products */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
            Total Products
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-bold">{data.totalProducts}</span>
            <span className="text-xs text-zinc-500">Unique SKUs</span>
          </div>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
            Low Stock Alert
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-bold text-amber-500">
              {data.lowStockCount}
            </span>
            <span className="text-xs text-amber-500/80 font-medium">
              Needs review
            </span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
            Out of Stock
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-bold text-red-500">
              {data.outOfStockCount}
            </span>
            <span className="text-xs text-red-500/80 font-medium">
              Critical
            </span>
          </div>
        </div>

        {/* Total Physical Units in Warehouse */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
            Total Units
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-bold text-emerald-400">
              {data.totalUnits.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-500">In physical stock</span>
          </div>
        </div>
      </div>

      {/* Middle Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Restock List */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span>🚨</span> Restock Required
              </h2>
              <Link
                href="/dashboard/inventory"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                View full inventory →
              </Link>
            </div>

            {data.urgentItems.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                All inventory levels are healthy! No items require restocking.
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-zinc-800/60">
                {data.urgentItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm text-zinc-200">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {item.category?.name || "Uncategorized"} • SKU:{" "}
                        {item.sku}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          item.quantity === 0
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {item.quantity === 0
                          ? "Out of Stock"
                          : `${item.quantity} units left`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-5">Category Distribution</h2>

          {data.categoryStats.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              No category data available.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {data.categoryStats.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-300">{cat.name}</span>
                    <span className="text-zinc-400">
                      {cat.count} items ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Recently Added Items */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recently Added Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.recentItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {item.category?.name || "Uncategorized"}
                </span>
                <h3 className="font-medium text-sm text-zinc-200 mt-1 truncate">
                  {item.name}
                </h3>
              </div>
              <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-zinc-800/40 text-xs">
                <span className="text-zinc-400">SKU: {item.sku}</span>
                <span className="text-zinc-200 font-semibold">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
