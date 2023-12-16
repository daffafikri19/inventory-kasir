import NextAuth from "next-auth";

declare module "next-auth" {

    interface User {
        id?: any
        fullname?: any
        role?: any
        karyawanId?: any
        image?: any
        location?: any
    }

    interface Session {
        user: User & {
            id?: any
            fullname?: any
            role?: any
            karyawanId?: any
            image?: any
            location?: any
        }
        token: {
            id?: any
            fullname?: any
            role?: any
            karyawanId?: any
            image?: any
            location?: any
        }
    }
}