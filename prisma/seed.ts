import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
    await prisma.booth.create({
        data: {
            location: 'Pondok Rejeki, Kotabumi',
            createdAt: new Date(Date.now()).toLocaleString(),
            updatedAt: new Date(Date.now()).toLocaleString(),
        }
    }).then(async () => {
        await prisma.user.create({
            data: {
                fullname: 'Daffa Fikri Fahresi',
                karyawanId: 'daffa192023',
                password: 'Daffa123456',
                role: 'Karyawan',
                booth: {
                    connect: {
                        location: 'Pondok Rejeki, Kotabumi'
                    }
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            },
        });
    }).then(async () => {
        await prisma.user.create({
            data: {
                fullname: 'Owner',
                karyawanId: 'owner2023',
                password: 'Owner123456',
                role: 'Owner',
                booth: {
                    connect: {
                        location: 'Pondok Rejeki, Kotabumi'
                    }
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            },
        });
    }).then(async () => {
        await prisma.user.create({
            data: {
                fullname: 'Ezhar Widjan Hannafhan',
                karyawanId: 'ezhar022023',
                password: 'Ezhar123456',
                role: 'Karyawan',
                booth: {
                    connect: {
                        location: 'Pondok Rejeki, Kotabumi'
                    }
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            },
        });
    }).then(async () => {
        await prisma.product.create({
            data: {
                size: 'Kecil',
                variant: 'Original',
                price: 3000,
                productImage: '/es-teh-solo-original.jpg',
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                booth: {
                    connect: {
                        location: 'Pondok Rejeki, Kotabumi'
                    }
                }
            }
        }).then(async () => {
            await prisma.product.create({
                data:
                {
                    size: 'Besar',
                    variant: 'Original',
                    price: 4000,
                    productImage: '/es-teh-solo-original.jpg',
                    createdAt: new Date(Date.now()).toLocaleString(),
                    updatedAt: new Date(Date.now()).toLocaleString(),
                },
            })
        }).then(async () => {
            await prisma.product.create({
                data: {
                    size: 'Besar',
                    variant: 'Jeruk_Nipis',
                    price: 5000,
                    productImage: '/es-teh-solo-jeruk-nipis.jpg',
                    createdAt: new Date(Date.now()).toLocaleString(),
                    updatedAt: new Date(Date.now()).toLocaleString(),
                },
            }).then(async () => {
                await prisma.product.create({
                    data: {
                        size: 'Besar',
                        variant: 'Lemon',
                        price: 6000,
                        productImage: '/es-teh-solo-lemon.jpg',
                        createdAt: new Date(Date.now()).toLocaleString(),
                        updatedAt: new Date(Date.now()).toLocaleString(),
                    },
                })
            })
        })
    })
}