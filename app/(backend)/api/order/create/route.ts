import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {
        productId,
        quantity,
        totalPrice,
        catatan,
        orderId,
        location,
        operator
    } = body;

    const booth = await prisma.booth.findFirst({
        where: {
            location: location
        }
    });
    if(!booth) return NextResponse.redirect(req.nextUrl.hostname)

    try {

        // Dapatkan jumlah total pesanan yang sudah ada di tabel order
        const jumlahTotalPesanan = await prisma.order.aggregate({
            _count: {
                id: true,
            },
        });

         // Hitung nomor pesanan berikutnya berdasarkan jumlah total pesanan
         const nomorPesananBerikutnya = jumlahTotalPesanan._count.id + 1;

        const order = await prisma.orderItem.create({
            include: {
                product: true,
            },
            data: {
                productId: productId,
                quantity: quantity,
                totalPrice: totalPrice,
                catatan: catatan,
                orderId: orderId,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                orders: {
                    connectOrCreate: {
                        where: {
                            id: orderId
                        },
                        create: {
                            id: orderId,
                            orderNumber: nomorPesananBerikutnya,
                            priceTotal: 0,
                            quantityTotal: 0,
                            status: 'proses',
                            boothId: booth.id,
                            booth: {
                                connect: {
                                    location: location
                                }
                            },
                            operator: {
                                connect: {
                                    karyawanId: operator
                                }
                            },
                            createdAt: new Date(Date.now()).toLocaleString(),
                            updatedAt: new Date(Date.now()).toLocaleString(),
                        }
                    }
                }
            }
        });

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                priceTotal: {
                    increment: totalPrice
                },
                quantityTotal: {
                    increment: quantity
                },
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });

        return NextResponse.json(order, {
            status: 200
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            message: "terjadi kesalahan saat membuat orderan",
            error: error
        }, {
            status: 500
        })
    }

}