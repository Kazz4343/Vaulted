import Navbar from "@/components/navbar";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const features = [
    {
      icon: "📦",
      title: "Real-time stock",
      desc: "Live counts across every product",
    },
    { icon: "📊", title: "Sales analytics", desc: "Sales vs. purchase trends" },
    { icon: "🧾", title: "Invoices", desc: "Track what's owed and paid" },
    {
      icon: "👥",
      title: "Customer insights",
      desc: "First-time vs. returning",
    },
    { icon: "🔐", title: "Secure auth", desc: "Role-based access control" },
  ];

  return (
    <div className="min-h-screen min-w-100 bg-bgdark">
      <Navbar />

      {/*Hero Section*/}
      <div className="flex flex-col items-center justify-center mt-25">
        <div className="flex flex-col items-center">
          <div className="text-accent-dark font-md font-bold mb-3 text-sm">
            PORTFOLIO PROJECT · BUILT 2026
          </div>

          {/*placeholder stat*/}
          <div className="border bg-[#12151C] rounded-full border-t-gray-border px-4 py-1.5 mb-11">
            <span>
              📦 1,200+
              <span className="text-[#8b909c]"> products tracked </span>| 🏬 40+
              <span className="text-[#8b909c]"> suppliers </span>| 🕒{" "}
              <span className="text-[#8b909c]">Updated live</span>
            </span>
          </div>

          <h1 className="text-5xl font-black mb-5">
            {/*Manage Your Inventory without Spreading Chaos*/}
            Manage Your VAULT
          </h1>
          <p className="text-sm text-accent-dark mb-9">
            Spreading your inventory, without spreading chaos
          </p>

          <p className="mx-auto max-w-155 text-md leading-relaxed text-center mb-18">
            Track stock levels, sales, purchases, and expenses in one dashboard.
            Connect suppliers, monitor profit in real time, and export reports —
            built with Next.js, Prisma, and Neon Postgres.
          </p>

          <div className="flex gap-18 mb-17">
            <Link
              href="/dashboard"
              className="bg-white-dark text-bgdark py-3.25 px-6.5 rounded-sm font-bold 
              text-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5
              hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="bg-bgdark text-white-dark py-3.25 px-6.5 rounded-sm 
              font-bold text-sm cursor-pointer border border-gray-border
              transition-all duration-300 hover:-translate-y-0.5 
              hover:border-white-dark hover:shadow-[0_0_15px_rgba(236,106,94,0.4)]"
            >
              View Github
            </Link>
          </div>

          <div className="grid text-left gap-3.5 grid-cols-[repeat(5,1fr)]">
            {features.map(
              ({
                icon,
                title,
                desc,
              }: {
                icon: string;
                title: string;
                desc: string;
              }) => (
                <div
                  key={title}
                  className="bg-[#12151C] border border-gray-border rounded-sm p-4.5"
                >
                  <p className="text-md mb-2">{icon}</p>
                  <p className="font-bold text-[14px] mb-1.5">{title}</p>
                  <p className="text-[#8b909c] text-[12px] leading-normal">
                    {desc}
                  </p>
                </div>
              ),
            )}
          </div>

          <h1 className="text-5xl"></h1>
        </div>
      </div>
    </div>
  );
}
