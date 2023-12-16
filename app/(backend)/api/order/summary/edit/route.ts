import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest){ 
    const { orderId } = await req.json();

    const existingOrder = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });

    if(!existingOrder) return NextResponse.json(`list order dengan id : ${orderId} tidak ditemukan`, {
        status: 404
    })

    try {
        const response = await prisma.order.update({
            where: {
                id: existingOrder.id
            },
            data: {
                priceTotal: existingOrder.priceTotal,
                quantityTotal: existingOrder.quantityTotal,
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });

        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'terjadi kesalahan server saat membuat summary list order',
            error: error
        }, {
            status: 500,
        })
    }
}