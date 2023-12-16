import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { karyawanId, password } = body

    const existingUser = await prisma.user.findUnique({
        where: {
            karyawanId: karyawanId
        },
        include: {
            booth: true,
        }
    });

    if(!password) return NextResponse.json('harap masukan password', {
        status: 400
    })

    if(!existingUser) return NextResponse.json(
        `user dengan karyawan id: ${karyawanId} tidak ada`, {
        status: 404
    })

    // matching password
    const match = await bcrypt.compare(password, existingUser.password)
    if(!match) return NextResponse.json('password salah', {
        status: 400
    })

    // create jwt token
    const idKaryawan = existingUser.karyawanId;
    const role = existingUser.role;
    const image = existingUser.image;
    const fullname = existingUser.fullname;
    const location = existingUser.booth[0].location

    try {
        const accessToken = jwt.sign({
            idKaryawan : idKaryawan,
            role: role,
            image: image,
            fullname: fullname,
            location: location
        }, process.env.ACCESS_TOKEN!, {
            expiresIn: '30m'
        });

        const refreshToken = jwt.sign({
            idKaryawan: idKaryawan,
            role: role,
            image: image,
            fullname: fullname,
            location: location
        }, process.env.REFRESH_TOKEN!, {
            expiresIn: '1d' 
        });
        
        const response = NextResponse.json({ accessToken }, {
            status: 200,
        });
        
        response.cookies.set('existingUser', refreshToken, {
            expires: 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return response;
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}