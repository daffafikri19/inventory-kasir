import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { 
        location,
        gula_pasir,
        cup_kecil,
        cup_besar,
        sedotan,
        es_batu,
        lemon,
        jeruk_nipis,
        plastik_kecil,
        plastik_sedang,
        plastik_besar
     } = await req.json();

    const booth = await prisma.booth.findUnique({
        where: {
            location: location
        }
    });

    if(!booth) return NextResponse.json({
        message: `booth dengan lokasi ${location} tidak ditemukan`
    }, {
        status: 404
    });


    try {
        const response = await prisma.stok.update({
            where: {
                boothId: booth.id
            },
            data: {
                gula_pasir: gula_pasir,
                cup_kecil: cup_kecil,
                cup_besar: cup_besar,
                sedotan: sedotan,
                es_batu: es_batu,
                lemon: lemon,
                jeruk_nipis: jeruk_nipis,
                plastik_besar: plastik_besar,
                plastik_kecil: plastik_kecil,
                plastik_sedang: plastik_sedang,
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });
        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat update stok laporan',
            error: error
        }, {
            status: 500
        })
    }
}