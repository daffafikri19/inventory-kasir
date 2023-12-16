"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const routeParts = pathname.split("/").filter((part) => part !== "");

  return (
    <div className="flex flex-col truncate gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-1 px-4">
      <nav>
        <ol className="flex items-center gap-2">
          {routeParts.map((part, index) => (
            <React.Fragment key={index}>
              {index === 0 ? (
                <span className=""> / </span>
              ) : (
                <span className=""> / </span>
              )}
              {index === routeParts.length - 1 ? (
                <span className="font-medium text-primary cursor-not-allowed ">
                  {part}
                </span>
              ) : (
                <Link href={`/${routeParts.slice(0, index + 1).join("/")}`}>
                  <span className="font-medium cursor-pointer">
                    {part}
                  </span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
