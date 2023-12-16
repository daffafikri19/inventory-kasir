import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function PATCH(req: NextRequest) {

    const { status, orderId,orderedItem, orderNumber, priceTotal, quantityTotal } = await req.json();

    if(!orderId) return NextResponse.json("orderId tidak ditemukan", {
        status: 404
    })

    try {
        const response = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: status,
                orderedItem: orderedItem,
                orderNumber: orderNumber,
                priceTotal: priceTotal,
                quantityTotal: quantityTotal,
                updatedAt: new Date(Date.now()).toLocaleString()
            }
        });

        return NextResponse.json({
            message: "berhasil menyelesaikan orderan ini",
            data: response
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json('terjadi kesalahan server saat menyelesaikan orderan', {
            status: 500
        })
    }
}