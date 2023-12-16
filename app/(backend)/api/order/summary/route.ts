import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function GET(req: NextRequest){ 
    const onProgressOrder = await prisma.order.findMany({
        where: {
            status: 'proses'
        },
        include: {
            _count: true,
            orderedItem: {
                select: {
                    product: true,
                    _count: true,
                    catatan: true,
                    id: true,
                    orderId: true,
                    orders: true,
                    productId: true,
                    quantity: true,
                    totalPrice: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    if(!onProgressOrder) return NextResponse.json(`tidak ada orderan`, {
        status: 404
    })

    return NextResponse.json(onProgressOrder, {
        status: 200
    });
}