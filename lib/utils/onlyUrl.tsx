"use client"
import React from 'react'
import { usePathname } from "next/navigation"

const OnlyUrlPage = ({
    children
} : {
    children : React.ReactNode
}) => {
    const pathname = usePathname();
    console.log(pathname)
  return (
    <>
        {children}
    </>
  )
}

export default OnlyUrlPage