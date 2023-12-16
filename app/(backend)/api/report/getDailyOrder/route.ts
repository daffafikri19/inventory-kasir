import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { date, location } = await req.json();

    const booth = await prisma.booth.findUnique({
        where: {
            location: location
        }
    });

    if(!booth) return NextResponse.json({
        message: 'lokasi booth tidak ditemukan'
    })

    try {
        const orders = await prisma.order.findMany({
            where: {
                status: 'selesai',
                booth: {
                    every: {
                        location: booth.location
                    }
                },
                createdAt: {
                    gte: `${date}, 00.00.00`,
                    lte: `${date}, 23.59.59`
                }, 
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

        const aggregate = await prisma.order.aggregate({
            where: {
                createdAt: {
                    gte: `${date}, 00.00.00`,
                    lte: `${date}, 23.59.59`
                }, 
                status: 'selesai'
            },
            _count: true,
            _sum: {
                priceTotal: true,
                quantityTotal: true
            },
            orderBy: {
                orderNumber: 'asc'
            }        
        })

        return NextResponse.json({
            data: orders,
            summary: aggregate
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat mendapatkan data report harian',
            error: error
        }, {
            status: 500
        })
    }
}