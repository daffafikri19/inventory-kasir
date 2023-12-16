import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { id } = await req.json();

    const order = await prisma.order.findUnique({
        where: {
            id: id
        }
    });

    if(!order) return NextResponse.json(`orderan dengan id : ${id} tidak ditemukan`, {
        status: 404
    });

    try {
        const response = await prisma.order.delete({
            where: {
                id: order.id
            }
        });

        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json('terjadi kesalahan server saat delete pesanan', {
            status: 500
        })
    }
}