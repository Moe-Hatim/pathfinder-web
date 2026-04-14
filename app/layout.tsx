import type { Metadata } from "next";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth-session";
import { HeaderNavigation } from "@/components/navigation/header-navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "PathFinder",
  description:
    "PathFinder helps students discover the right tech path with explainable recommendations and a practical roadmap.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <HeaderNavigation isAuthenticated={Boolean(user)} userName={user?.name} />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
