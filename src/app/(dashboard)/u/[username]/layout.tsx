import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-14">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
