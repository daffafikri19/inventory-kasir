import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Inventory Kasir by Teh Solo",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default async function Home() {

  const session = await getServerSession(authOptions);

  console.log("ini session", session)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      Dashboard Page
    </div>
  )
}