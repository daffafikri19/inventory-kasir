import { NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET() {
    try {
        const data = await prisma.order.findMany({
            where: {
                status: "proses"
            },
            include: {
                orderedItem: true,
                _count: true
            },
            orderBy: {
                orderNumber: 'asc'
            },
            
        });
        return NextResponse.json(data, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {
            status: 500
        })
    }
}