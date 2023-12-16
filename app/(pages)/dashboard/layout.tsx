import "../../globals.css";
import Header from "../../../components/global/Header";
import Sidebar from "../../../components/global/Sidebar/Sidebar";
import { ThemeProvider } from "../../../lib/providers/theme-provider";
import Breadcrumb from "@/components/global/Breadcrumbs/Breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions);
  const now = new Date(Date.now()).toLocaleString();
  console.log("date now", now)
  return (
      <div suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="text-black dark:text-white">
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header karyawanId={session?.user.karyawanId} role={session?.user.role} fullname={session?.user.fullname} image={session?.user.image} location={session?.user.location} />
                <div className="relative">
                  <div className="bg-background w-full shadow-sm sticky">
                    <Breadcrumb />
                  </div>
                  <div className="mx-auto max-w-screen-2xl px-1 py-1">
                  {/* py-1 px-1 md:py-2 md:px-2 overflow-y-scroll mt-8 min-h-screen */}
                    <div className="">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </div>
  );
}
