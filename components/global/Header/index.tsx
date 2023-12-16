"use client"
import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { Button } from "@/components/ui/button";
import { HomeIcon, MenuIcon, SearchIcon } from "lucide-react";
import { DropdownUser } from "./DropdownUser";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileSidebar from "../Sidebar/MobileSidebar";
import { useRouter } from "next/navigation";
import { sessionProps } from "@/types";

const Header = ({ karyawanId, role, fullname, image, location }: sessionProps) => {

  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 flex w-full drop-shadow-1 border-b-4">
      <div className="flex flex-grow items-center z-0 justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 bg-white dark:bg-background">
        <div className="flex items-center gap-2 sm:gap-4">

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="icon">
                  <MenuIcon className="icon-size md:w-6 md:h-6 lg:h-8 lg:w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 m-0">
                <MobileSidebar />
              </SheetContent>
            </Sheet>
          </div>

          <div className="md:block">
            <div className="flex items-center">
              <div className="relative flex items-center space-x-4">
                <Button variant="secondary" size="icon" onClick={() => router.push('/dashboard')}>
                  <HomeIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser location={location} karyawanId={karyawanId} fullname={fullname} role={role} image={image} />
        </div>
      </div>
    </header>
  );
};

export default Header;
