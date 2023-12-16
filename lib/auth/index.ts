import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/utils/prisma"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                karyawanId: { label: 'Karyawan ID', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, request) {
                if (!credentials?.karyawanId || !credentials?.password) {
                    console.log("no credentials provided")
                    return null
                }
                const existingUser = await prisma.user.findUnique({
                    where: {
                        karyawanId: credentials?.karyawanId
                    },
                    include: {
                        booth: true
                    }
                });
                if (!existingUser) {
                    console.log("akun tidak ditemukan")
                    return null
                };

                const comparePassword = await bcrypt.compare(credentials.password, existingUser.password);
                if (!comparePassword) {
                    console.log("password tidak cocok atau salah")
                    return null
                };

                return {
                    id: existingUser.id,
                    fullname: existingUser.fullname,
                    role: existingUser.role,
                    karyawanId: existingUser.karyawanId,
                    image: existingUser.image,
                    location: existingUser.booth[0].location
                }
            }
        }),
    ],
    pages: {
        signIn: "/",
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 1 hari
    },
    secret: process.env.NEXTAUTH_SECRET_KEY,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    fullname: user.fullname,
                    role: user.role,
                    karyawanId: user.karyawanId,
                    image: user.image,
                    location: user.location
                }
            }
            return token
        },
        async session({ session, token }) {
            const context = {
                ...session,
                user: {
                    ...session.user,
                    fullname: token.fullname,
                    role: token.role,
                    karyawanId: token.karyawanId,
                    image: token.image,
                    location: token.location
                }
            }
            return context
        }
    }
}
