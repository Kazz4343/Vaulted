import { getUserSession } from "@/lib/auth";

export default async function Dashboard() {
  const user = await getUserSession();

  return (
    <div>
      <p>Welcom to Vaulted {user?.username}</p>
    </div>
  );
}
