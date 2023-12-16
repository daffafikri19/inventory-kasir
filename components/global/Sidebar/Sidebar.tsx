"use client"
import { ChevronsRight, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { cn } from "@/lib/utils/utils";
import { usePathname } from "next/navigation";

const kasirRoute = [
  {
    label: "Kasir",
    url: "/dashboard/kasir"
  },
  {
    label: "List Penjualan",
    url: "/dashboard/penjualan"
  }
];

const inventoryRoute = [
  {
    label: "Inventory",
    url: "/dashboard/inventory"
  }
]

const karyawanRoute = [
  {
    label: "List Karyawan",
    url: "/dashboard/karyawan/list"
  },
  {
    label: "Tambah Karyawan",
    url: "/dashboard/karyawan/add"
  }
]

const laporanRoute = [
  {
    label: "Buat Laporan Closing",
    url: "/dashboard/laporan/closing"
  },
  {
    label: "Data Laporan Harian",
    url: "/dashboard/laporan/laporan-harian" // user (only read), owner (crud) tracking by id
  }
]

const boothRoute = [
  {
    label: "List Booth",
    url: "/dashboard/booth"
  },
]

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = React.useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  React.useEffect(() => {
    const storedMenuOpen = localStorage.getItem("menuOpen");
    if (storedMenuOpen) {
      setMenuOpen(JSON.parse(storedMenuOpen));
    }
  }, []);

  const handleOpen = (value: number) => {
    setMenuOpen((prevMenuOpen) => {
      const updatedMenuOpen = {
        ...prevMenuOpen,
        [value]: !prevMenuOpen[value],
      };
      localStorage.setItem("menuOpen", JSON.stringify(updatedMenuOpen));
      return updatedMenuOpen;
    });
  };

  const pathname = usePathname();
  return (
    <div className='space-y-4 hidden md:flex flex-col h-full overflow-y-scroll'>
      <div className='py-2 flex-1'>
        <div className="mb-2 flex items-center space-x-2 px-2">
          {/* <Image src="" alt="Teh Solo" /> */}
          <Typography variant="h5" color="blue-gray">
            Teh Solo
          </Typography>
        </div>
        <List className='truncate'>
          <Accordion
            open={menuOpen[1]}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${menuOpen[1] ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={menuOpen[1]}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Penjualan
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 px-1 md:px-4">
              <List className="p-0">
                {kasirRoute.map((route) => (
                  <Link href={route.url} key={route.url}>
                    <ListItem className={cn("text-xs md:text-sm hover:bg-white/10 rounded-sm", pathname === route.url ? "text-primary bg-secondary" : "")}>
                    <ListItemPrefix>
                        <ChevronsRight className="h-4 w-4 mr-2" />
                      </ListItemPrefix>
                      {route.label}
                    </ListItem>
                  </Link>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={menuOpen[2]}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${menuOpen[2] ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={menuOpen[2]}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Stok Barang
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 px-1 md:px-4">
              <List className="p-0">
                {inventoryRoute.map((route) => (
                  <Link href={route.url} key={route.url}>
                    <ListItem className={cn("text-xs md:text-sm hover:bg-white/10 rounded-sm", pathname === route.url ? "text-primary bg-secondary" : "")}>
                      <ListItemPrefix>
                        <ChevronsRight className="h-4 w-4 mr-2" />
                      </ListItemPrefix>
                      {route.label}
                    </ListItem>
                  </Link>
                ))}
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={menuOpen[3]}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${menuOpen[3] ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={menuOpen[3]}>
              <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Karyawan
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 px-1 md:px-4">
              <List className="p-0">
                {karyawanRoute.map((route) => (
                  <Link href={route.url} key={route.url}>
                    <ListItem className={cn("text-xs md:text-sm hover:bg-white/10 rounded-sm", pathname === route.url ? "text-primary bg-secondary" : "")}>
                      <ListItemPrefix>
                        <ChevronsRight className="h-4 w-4 mr-2" />
                      </ListItemPrefix>
                      {route.label}
                    </ListItem>
                  </Link>
                ))}
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={menuOpen[4]}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${menuOpen[4] ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={menuOpen[4]}>
              <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Laporan
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 px-4">
              <List className="p-0">
                {laporanRoute.map((route) => (
                  <Link href={route.url} key={route.url}>
                    <ListItem className={cn("text-xs md:text-sm hover:bg-white/10 rounded-sm", pathname === route.url ? "text-primary bg-secondary" : "")}>
                    <ListItemPrefix>
                        <ChevronsRight className="h-4 w-4 mr-2" />
                      </ListItemPrefix> 
                      {route.label}
                    </ListItem>
                  </Link>
                ))}
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={menuOpen[5]}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${menuOpen[5] ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={menuOpen[5]}>
              <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Booth Tenan
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 px-4">
              <List className="p-0">
                {boothRoute.map((route) => (
                  <Link href={route.url} key={route.url}>
                    <ListItem className={cn("text-xs md:text-sm hover:bg-white/10 rounded-sm", pathname === route.url ? "text-primary bg-secondary" : "")}>
                    <ListItemPrefix>
                        <ChevronsRight className="h-4 w-4 mr-2" />
                      </ListItemPrefix> 
                      {route.label}
                    </ListItem>
                  </Link>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
        </List>

      </div>
    </div>
  );
}
