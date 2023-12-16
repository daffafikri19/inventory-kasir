import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { id, location } = await req.json();

    const booth = await prisma.booth.findUnique({
        where: {
            location: location
        }
    });

    if(!booth) return NextResponse.json({
        message: `booth dengan lokasi : ${location} tidak ditemukan`
    })

    try {
        const orders = await prisma.order.findMany({
            where: {
                status: 'selesai',
                id: id,
                booth: {
                    every: {
                        location: booth.location
                    }
                }
            },
            include: {
                _count: true,
                booth: true,
                orderedItem: {
                    include: {
                        product: true
                    }
                },
                operator: true
            },
            orderBy: {
                orderNumber: 'asc'
            }
        });

        return NextResponse.json(orders, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat mendapatkan data laporan id"
        }, {
            status: 500
        })
    }
}