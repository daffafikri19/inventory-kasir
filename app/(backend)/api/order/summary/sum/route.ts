import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { location } = await req.json();

    const booth = await prisma.booth.findFirst({
        where: {
            location: location
        }
    })

    if(!booth) return NextResponse.json('tidak menemukan sesi user yang cocok untuk lokasi booth', {
        status: 404
    })

    try {
        const summary = await prisma.order.aggregate({
            _count: true,
            where: {
                boothId: booth.id,
                status: 'selesai'
            },
            _avg: {
                priceTotal: true,
                quantityTotal: true
            },
            _max: {
                priceTotal: true,
                quantityTotal: true
            },
            _min: {
                priceTotal: true,
                quantityTotal: true
            },
            _sum: {
                quantityTotal: true,
                priceTotal: true
            }
        });

        return NextResponse.json(summary, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json('terjadi kesalahan server saat menghitung sum order', {
            status: 500
        })
    }
}