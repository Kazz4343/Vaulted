// app/dashboard/DashboardNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({
  children,
  userMenu,
}: {
  children: React.ReactNode;
  userMenu: React.ReactNode;
}) {
  const nav_items = [
    { label: "Dashboard", href: "/dashboard", icon: "🎢" },
    { label: "Inventory", href: "/dashboard/inventory", icon: "🔀" },
    { label: "Add Item", href: "/dashboard/addItem", icon: "➕" },
    { label: "Setting", href: "/dashboard/setting", icon: "📐" },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="top-0 z-50 sticky w-full bg-bgdark h-11 flex border-b border-gray-border">
        <div className="w-72 shrink-0 flex items-center border-r border-gray-border">
          <Link href={"/"} className="text-xl font-semibold mx-auto">
            <span>Vault</span>
            <span className="text-accent-dark">ed</span>
          </Link>
        </div>

        <div className="flex grow justify-end items-center px-6">
          {userMenu}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1">
        <aside className="w-72 shrink-0 min-h-screen px-3 bg-zinc-900 border-r border-gray-border">
          <nav className="flex flex-col gap-2 mt-7">
            {nav_items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-accent-dark/20 text-accent-dark border border-accent-dark/30"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
