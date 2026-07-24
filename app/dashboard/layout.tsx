import { UserButton } from "@neondatabase/auth/react";
import Link from "next/link";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const nav_items = [
    { label: 'Dashboard', href: '/dashboard', icon: '🎢' },
    { label: 'Inventry', href: '/dashboard/inventory', icon: '🔀' },
     { label: 'Add Item', href: '/dashboard/addItem', icon: '➕' },
    { label: 'History', href: '/dashboard/history', icon: '📼' },
    { label: 'Setting', href: '/dashboard/setting', icon: '📐' }
  ]
  

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
          <UserButton size={'icon'} className=" w-15" />
        </div>
      </div>

      {/* Left Bar & Main Content */}
      <div className="flex">
        <aside className="min-h-screen w-79">
          {nav_items.map((item) => {
            return(
              <nav key={item.label} className="mt-10 border border-gray-border bg-bgdark mx-8 py-2 rounded-lg px-2">
                <Link href={item.href} className="font-semibold text-md text-bg-day">{item.icon} {item.label}</Link>
              </nav>
            )
          })}
        </aside>
        {children}
      </div>
    </div>
  );
}
