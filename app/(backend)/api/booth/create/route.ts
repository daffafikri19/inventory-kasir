import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { location } = await req.json();
    try {
        await prisma.booth.create({
            data: {
                location: location,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });

        return NextResponse.json({
            message: "berhasil menambahkan booth"
        });
        
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat menambahkan booth",
            error: error
        }, {
            status: 500
        })
    }
}