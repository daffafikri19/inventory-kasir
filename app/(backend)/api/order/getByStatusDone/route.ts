import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { date } = await req.json();
    try {
        const response = await prisma.order.findMany({
            where: {
                status: 'selesai',
                createdAt: {
                    gte: `${date}, 00.00.00`,
                    lte: `${date}, 23.59.59`
                }
            },
            orderBy: {
                orderNumber: 'desc'
            },
            include: {
                orderedItem: {
                    include: {
                        product: true
                    }
                },
                _count: true,
                booth: true,
                operator: true,
            }
        });

        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat mendapatkan data laporan penjualan harian',
            error: error
        }, {
            status: 500
        })
    }
}