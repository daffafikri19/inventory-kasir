"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { boothProps } from '@/types'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const FormSelectBooth = ({ onSelectedBooth }: { onSelectedBooth: (booth: string) => void }) => {
    const router = useRouter();
    const [booths, setBooths] = useState<boothProps[]>([]);
    const [selectedBooth, setSelectedBooth] = useState("");

    const sendSelectedBooth = () => {
        onSelectedBooth(selectedBooth)
    }

    useEffect(() => {
        const getAllBooth = async () => {
            try {
                const response = await axios.get('/api/booth/get');
                setBooths(response.data);
                return response.data
            } catch (error) {
                console.log(error)
            }
        }

        getAllBooth();
    }, []);

    return (
        <div className='flex flex-col justify-end'>
            <div className='my-5 w-full flex justify-end'>
                <Button className='flex items-center justify-center' onClick={() => router.push('/dashboard/inventory/add')}>
                    <Plus className='w-5 h-5 mr-3' />
                    <span>Tambah Stok</span>
                </Button>
            </div>
            <Select onValueChange={(e) => {
                setSelectedBooth(e)
            }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="pilih lokasi booth" />
                </SelectTrigger>
                <SelectContent>
                    {booths.map((booth) => (
                        <SelectItem value={booth.location} key={booth.id}>{booth.location}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button className='mt-5'
                disabled={!selectedBooth}
                onClick={sendSelectedBooth}>
                Tampilkan Data
            </Button>
        </div>
    )
}

export default FormSelectBooth