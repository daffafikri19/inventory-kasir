import bcrypt from "bcrypt";
import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { fullname, role, image, karyawanId, password, confPassword, location } = body;

    if (!fullname) return NextResponse.json("nama lengkap wajib diisi", { status: 400 });
    if (!role) return NextResponse.json("role wajib diisi", { status: 400 });
    if (!karyawanId) return NextResponse.json("ID karyawan wajib diisi", { status: 400 });
    if (!password) return NextResponse.json("password wajib diisi", { status: 400 });
    if (!confPassword) return NextResponse.json("konfirmasi password wajib diisi", { status: 400 });
    if (!location) return NextResponse.json("lokasi booth wajib diisi", { status: 400 });
    // cek karyawanId
    const exist = await prisma.user.findUnique({
        where: {
            karyawanId: karyawanId
        }
    });

    if(exist) return NextResponse.json("ID Karyawan sudah digunakan oleh user lain");

    // cek pass confirmation
    if (password !== confPassword) return NextResponse.json("password dengan konfirmasi password tidak cocok", {status: 400});


    const booth = await prisma.booth.findFirst({
        where: {
            location: location
        }
    });
    if(!booth) return NextResponse.json(`booth dengan lokasi : ${location} tidak ditemukan`, {
        status: 404
    })

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            fullname: fullname,
            karyawanId: karyawanId,
            role: role,
            image: image,
            password: hashedPassword,
            booth: {
                connect: {
                    id: booth.id
                }
            },
            createdAt: new Date(Date.now()).toLocaleString(),
            updatedAt: new Date(Date.now()).toLocaleString(),
        }
    });
     return NextResponse.json(user)
    } catch (error : any) {
       return NextResponse.json(error.message)
    }
}
