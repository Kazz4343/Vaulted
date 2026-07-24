"use client";

import { UserButton } from "@neondatabase/auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav_items = [
    { label: "Dashboard", href: "/dashboard", icon: "🎢" },
    { label: "Inventory", href: "/dashboard/inventory", icon: "🔀" },
    { label: "Add Item", href: "/dashboard/addItem", icon: "➕" },
    { label: "Setting", href: "/dashboard/setting", icon: "📐" },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {/* Top Bar */}
      <div className="top-0 z-50 sticky w-full bg-bgdark h-11 flex border-b border-gray-border">
        <div className="w-70 flex items-center border-gray-border border-r">
          <Link href={"/"} className="text-xl font-semibold mx-auto">
            <span>Vault</span>
            <span className="text-accent-dark">ed</span>
          </Link>
        </div>

        <div className="flex grow justify-end items-center mr-20">
          <UserButton size={"icon"} className=" w-15" />
        </div>
      </div>

      {/* Left Bar & Main Content */}
      <div className="flex">
        <aside className="min-h-screen w-81 overflow-hidden px-3">
          {nav_items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors mt-7 ${
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
        </aside>
        {children}
      </div>
    </div>
  );
}
