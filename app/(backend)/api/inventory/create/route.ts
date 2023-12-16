import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const {
        gula_pasir,
        cup_kecil,
        cup_besar,
        sedotan,
        es_batu,
        lemon,
        jeruk_nipis,
        plastik_kecil,
        plastik_sedang,
        plastik_besar,
        location
    } = body;

    try {
        const booth = await prisma.booth.findFirst({
            where: {
                location: location
            }
        });
        if(!booth) return NextResponse.json(`booth dengan lokasi : ${location} tidak ditemukan`, {
            status: 404
        })

        const response = await prisma.stok.upsert({
            include: {
                booth: true,
                _count: true
            },
            create: {
                gula_pasir: gula_pasir,
                cup_kecil: cup_kecil,
                cup_besar: cup_besar,
                sedotan: sedotan,
                es_batu: es_batu,
                lemon: lemon,
                jeruk_nipis: jeruk_nipis,
                plastik_kecil: plastik_kecil,
                plastik_sedang: plastik_sedang,
                plastik_besar: plastik_besar,
                updatedAt: new Date(Date.now()).toLocaleString(),
                createdAt: new Date(Date.now()).toLocaleString(),
                boothId: booth.id,
                booth: {
                    connect: {
                        location: booth.location
                    }
                }
            },
            update: {
                gula_pasir: {
                    increment: gula_pasir
                },
                cup_kecil: {
                    increment: cup_kecil
                },
                cup_besar: {
                    increment: cup_besar
                },
                sedotan: {
                    increment: sedotan
                },
                es_batu: {
                    increment: es_batu
                },
                lemon: {
                    increment: lemon
                },
                jeruk_nipis: {
                    increment: jeruk_nipis
                },
                plastik_kecil: {
                    increment: plastik_kecil
                },
                plastik_sedang: {
                    increment: plastik_sedang
                },
                plastik_besar: {
                    increment: plastik_besar
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                booth: {
                    connect: {
                        location: booth.location 
                    }
                }
            },
            where: {
                boothId: booth.id
            }
        });
        return NextResponse.json(response, {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(error, {
            status: 400
        })
    }
}