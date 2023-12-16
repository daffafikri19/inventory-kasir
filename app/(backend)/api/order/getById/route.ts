import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { id } = body;

    try {
        const data = await prisma.orderItem.findUnique({
            where: {
                id: id
            }
        });

        if(!data) return NextResponse.json(`orderan dengan id: ${id} tidak ditemukan`, {
            status: 404
        })

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