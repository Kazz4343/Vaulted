// app/dashboard/layout.tsx
import UserMenu from "@/components/Usermenu";
import DashboardNav from "./DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardNav userMenu={<UserMenu />}>{children}</DashboardNav>;
}
