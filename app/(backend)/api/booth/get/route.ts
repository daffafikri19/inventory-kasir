import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function GET() {
    try {
        const booths = await prisma.booth.findMany({
            include: {
                _count: true,
                orderan: {
                    include: {
                        _count: true
                    }
                },
                products: {
                    include: {
                        _count: true,
                        orderedItem: true
                    }
                },
                stok: {
                    include: {
                        _count: true,
                    }
                },
                user: {
                    include: {
                        _count: true,
                        laporan: true,
                    },
                }
            }
        });

        return NextResponse.json(booths, {
            status: 200
        });
    } catch (error) {
        console.log(error);
        NextResponse.json(error, {
            status: 400
        })
    }
}