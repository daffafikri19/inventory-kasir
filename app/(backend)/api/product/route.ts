import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

// get produk
export async function GET() {
    try {
        const produk = await prisma.product.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        return NextResponse.json(produk)
    } catch (error) {
        console.log("error get detail produk", error)
    }
}