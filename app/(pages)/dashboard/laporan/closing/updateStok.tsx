"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CircleDotDashedIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export default function UpdateStokComponent({ location, label, onSuccess } : { location: string, label: string, onSuccess: (status: string) => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [stokData, setStokData] = useState({
        gula_pasir: 0,
        cup_kecil: 0,
        cup_besar: 0,
        sedotan: 0,
        es_batu: 0,
        lemon: 0,
        jeruk_nipis: 0,
        plastik_kecil: 0,
        plastik_sedang: 0,
        plastik_besar: 0,
    });
    useEffect(() => {
        const getBoothLocation = async () => {
            const response = await axios.get('/api/booth/get');
            return response.data
        }

        getBoothLocation();
    }, [])

    const submitStok = async () => {
        setLoading(true)
        try {
            const response = await axios.post('/api/inventory/update', {
                gula_pasir: stokData.gula_pasir,
                cup_kecil: stokData.cup_kecil,
                cup_besar: stokData.cup_besar,
                sedotan: stokData.sedotan,
                es_batu: stokData.es_batu,
                lemon: stokData.lemon,
                jeruk_nipis: stokData.jeruk_nipis,
                plastik_kecil: stokData.jeruk_nipis,
                plastik_sedang: stokData.plastik_sedang,
                plastik_besar: stokData.plastik_besar,
                location: location
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);
            toast({
                title: `berhasil menambahkan stok barang untuk lokasi : ${location}`
            })
            handleSuccess("success")
        } catch (error) {
            console.log('error submit stok', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSuccess = (value: string) => {
        onSuccess(value)
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                submitStok();
            }}>
                <div className='w-full text-center mb-5'>
                    <p className='text-muted-foreground text-sm'>lokasi booth saat ini : {location}</p>
                </div>
                <div className='w-full flex items-center space-x-3'>
                    <div className='w-1/2 space-y-1'>
                        <Label>Cup Kecil</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.cup_kecil}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        cup_kecil: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>PCs</span>
                        </div>
                    </div>

                    <div className='w-1/2 space-y-1'>
                        <Label>Cup Besar</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.cup_besar}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        cup_besar: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>PCs</span>
                        </div>
                    </div>
                </div>

                <div className='w-full flex items-center space-x-3'>
                    <div className='w-1/2 space-y-1'>
                        <Label>Gula Pasir</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.gula_pasir}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        gula_pasir: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Pack</span>
                        </div>
                    </div>

                    <div className='w-1/2 space-y-1'>
                        <Label>Sedotan</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.sedotan}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        sedotan: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Pack</span>
                        </div>
                    </div>
                </div>

                <div className='w-full flex items-center space-x-3'>
                    <div className='w-1/2 space-y-1'>
                        <Label>Lemon</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.lemon}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        lemon: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Pcs</span>
                        </div>
                    </div>

                    <div className='w-1/2 space-y-1'>
                        <Label>Jeruk Nipis</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.jeruk_nipis}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        jeruk_nipis: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Pcs</span>
                        </div>
                    </div>
                </div>



                <div className='w-full flex items-center space-x-3'>
                    <div className='w-1/2 space-y-1'>
                        <Label>Es Batu</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.es_batu}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        es_batu: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Ball</span>
                        </div>
                    </div>

                    <div className='w-1/2 space-y-1'>
                        <Label>Plastik Kecil</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.plastik_kecil}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        plastik_kecil: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Pcs</span>
                        </div>
                    </div>
                </div>

                <div className='w-full flex items-center space-x-3'>
                    <div className='w-1/2 space-y-1'>
                        <Label>Plastik Sedang</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.plastik_sedang}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        plastik_sedang: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Pcs</span>
                        </div>
                    </div>

                    <div className='w-1/2 space-y-1'>
                        <Label>Plastik Besar</Label>
                        <div className='relative'>
                            <Input type='number' className='relative'
                                value={stokData.plastik_besar}
                                onChange={(e) => {
                                    setStokData((prev) => ({
                                        ...prev,
                                        plastik_besar: parseInt(e.target.value)
                                    }))
                                }}
                            />
                            <span className='absolute bottom-0 right-0 p-2.5 text-xs'>Pcs</span>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-end'>
                <Button disabled={loading} className='my-5'>
                    {loading && (
                        <CircleDotDashedIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {loading ? "Loading..." : `${label}`}
                </Button>
                </div>
            </form>
        </div>
    )
}
