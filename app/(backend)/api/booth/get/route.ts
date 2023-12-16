import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function GET() {
    try {
        const booths = await prisma.booth.findMany({
            include: {
                _count: true,
                laporan: true,
                orderan: true,
                products: true,
                stok: true,
                user: true
            }
        });

        return NextResponse.json(booths, {
            status: 200
        });
    } catch (error) {
        console.log(error);
        NextResponse.json(error, {
            status: 400
        })
    }
}