"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { boothProps } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"

export const BoothTable = () => {
    const [booths, setBooths] = useState<boothProps[]>([]);

    useEffect(() => {
        const getBoothData = async () => {
            try {
                const response = await axios.get('/api/booth/get');
                setBooths(response.data)
                console.log(response.data)
                return response.data
            } catch (error) {
                toast({
                    title: 'terjadi kesalahan server saat mendapatkan data booth',
                    variant: 'destructive'
                });
            }
        }

        getBoothData();
    }, [])

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Lokasi Booth</TableHead>
                        <TableHead>Karyawan</TableHead>
                        <TableHead>Produk</TableHead>
                        <TableHead>Stok</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!booths ? (
                        null
                    ) : (
                        <>
                            {booths.map((booth, index: number) => (
                                <TableRow key={booth.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{booth.location}</TableCell>
                                    <TableCell>{booth.user.map((user) => user.fullname)}</TableCell>
                                   
                                    <TableCell>$250.00</TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
            {!booths && (
                <div className='w-full items-center justify-center text-center mt-10'>
                    <p className='text-muted-foreground'>tidak ada booth</p>
                </div>
            )}
        </div>
    )
}