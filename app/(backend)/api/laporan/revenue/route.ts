import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function POST(req: NextRequest) {
    const { location, note_khusus, operator, laporanDate } = await req.json();
    try {
        const booth = await prisma.booth.findFirst({
            where: {
                location: location
            }
        });
        if (!booth) return NextResponse.json('booth tidak ditemukan', {
            status: 404
        });

        const listOrderan = await prisma.order.findMany({
            where: {
                boothId: booth.id
            }
        });
        if(!listOrderan) return NextResponse.json('laporan harus memiliki data penjualan', {
            status: 400
        })


        const totalDailyRevenue = await prisma.order.aggregate({
            _sum: {
                priceTotal: true
            },
            where: {
                status: 'selesai',
                boothId: booth.id
            }
        });

        const totalOrderan = await prisma.order.aggregate({
            _sum: {
                quantityTotal: true
            },
            where: {
                status: 'selesai',
                boothId: booth.id
            }
        })  

        const stok = await prisma.stok.findUnique({
            where: {
                boothId: booth.id
            }
        });
        if(!stok) return NextResponse.json('stok id tidak ditemukan', {
            status: 404
        });

        
        let laporan = await prisma.order.findFirst({
            where: {
                boothId: booth.id,
            }
        });

        if(!laporan) {
            const laporan = await prisma.laporan.create({
                data: {
                    daily_revenue: totalDailyRevenue._sum.priceTotal || 0,
                    date_laporan: new Date(Date.now()).toLocaleString(),
                    booth: {
                        connect: {
                            location: location
                        }
                    },
                    user: {
                        connect: {
                            karyawanId: operator
                        }
                    },
                    note_khusus: note_khusus,
                    createdAt: new Date(Date.now()).toLocaleString(),
                    updatedAt: new Date(Date.now()).toLocaleString()               
                }
            });

            return NextResponse.json(laporan, {
                status: 201
            })
        } else {
            const updateLaporan = await prisma.laporan.update({
                where: {
                    id: laporan.id
                },
                data: {
                    daily_revenue: totalDailyRevenue._sum.priceTotal || 0,
                    date_laporan: new Date(Date.now()).toLocaleString(),
                    booth: {
                        connect: {
                            location: location
                        }
                    },
                    user: {
                        connect: {
                            karyawanId: operator
                        }
                    },
                    note_khusus: note_khusus,
                    updatedAt: new Date(Date.now()).toLocaleString()   
                }
            });

            return NextResponse.json(updateLaporan, {
                status: 200
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json('terjadi kesalahan server saat membuat laporan', {
            status: 500
        })
    }
}