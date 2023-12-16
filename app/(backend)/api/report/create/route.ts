import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {

    const {
        id,
        date_laporan,
        note_khusus,
        daily_revenue,
        karyawanId,
        location
    } = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            karyawanId: karyawanId
        }
    });
    if(!user) return NextResponse.json({
        message: 'user tidak ditemukan'
    }, {
        status: 400
    })

    try {
       const addReport = await prisma.laporan.create({
            data: {
                id: id,
                user: {
                    connect: {
                        karyawanId: karyawanId
                    }
                },
                daily_revenue: daily_revenue,
                note_khusus: note_khusus,
                date_laporan: date_laporan,
                booth: {
                    connect: {
                        location: location   
                    }
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            },
            include: {
                booth: {
                    include: {
                        orderan: true,
                        stok: true
                    }
                },
                user: true
            }
       })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat membuat laporan'
        }, {
            status: 500
        })
    }
}