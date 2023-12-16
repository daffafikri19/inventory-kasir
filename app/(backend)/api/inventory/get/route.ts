import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { location } = body;

    try {
        const booth = await prisma.booth.findFirst({
            where: {
                location: location
            }
        });

        if(!booth) return NextResponse.json(`lokasi : ${location} booth tidak ditemukan`, {
            status: 404
        });

        const data = await prisma.stok.findUnique({
            where: {
                boothId: booth.id
            },
            select: {
                cup_besar: true,
                cup_kecil: true,
                es_batu: true,
                gula_pasir: true,
                jeruk_nipis: true,
                lemon: true,
                plastik_besar: true,
                plastik_kecil: true,
                plastik_sedang: true,
                sedotan: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}