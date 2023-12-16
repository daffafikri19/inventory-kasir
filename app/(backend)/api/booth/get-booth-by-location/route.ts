import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { location } = body;

    try {
        const response = await prisma.booth.findFirst({
            where: {
                location: location
            }
        });
        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        console.log("ERROR GET BOOTH BY LOCATION", error);
        return NextResponse.json(error, {
            status: 500
        })
    }
}