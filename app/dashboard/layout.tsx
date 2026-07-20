import Link from "next/link";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {/* Top Bar */}
      <div className="top-0 z-50 sticky w-full bg-bgdark h-11 flex border-b border-gray-border">
        <div className="w-70 flex items-center border-gray-border border-r">
          <Link href={"/"}>
            <span>Vault</span>
            <span>ed</span>
          </Link>
        </div>
        <div className="flex grow justify-end items-center">Placeholder</div>
      </div>

      {/* Left Bar & Main Content */}
      <div className="flex">
        <aside className="min-h-screen w-52"> left-side-bar</aside>
        {children}
      </div>
    </div>
  );
}
