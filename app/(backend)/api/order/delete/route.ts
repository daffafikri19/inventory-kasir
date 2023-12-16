import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const orderItem = await prisma.orderItem.findUnique({
        where: {
            id: id
        }
    });

    if(!orderItem) return NextResponse.json(`orderan dengan id: ${id} tidak ditemukan`, {
        status: 404
    })

    const countOrder = await prisma.orderItem.count({
        where: {
            orderId: orderItem.orderId
        }
    });

    try {
        await prisma.orderItem.delete({
            where: {
                id: orderItem.id
            }
        });

        if(countOrder === 1) {
            await prisma.order.delete({
                where: {
                    id: orderItem.orderId
                }
            }).then(() => {
                
            })
        }

        return NextResponse.json('berhasil menghapus orderan', {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: 'terjadi kesalahan saat delete orderan',
            error: error
        }, {
            status: 500
        })
    }
}