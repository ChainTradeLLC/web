import { getEvents } from "./data";
import { ApplicationLayout } from "./sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/app/lib/authOptions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let events = await getEvents();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <ApplicationLayout events={events}>{children}</ApplicationLayout>;
}
