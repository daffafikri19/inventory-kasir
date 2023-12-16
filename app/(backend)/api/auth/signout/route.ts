import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { key } = await req.json();
        if(key) {
            const response = NextResponse.json('berhasil logout', {
                status: 200
            });

            response.cookies.set(key, "", {
                expires: new Date(Date.now())
            })
            return response
        } else {
            return NextResponse.json('tidak ada sesi cookie', {
                status: 500
            })
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, {
            status: 500
        });
    }
}
