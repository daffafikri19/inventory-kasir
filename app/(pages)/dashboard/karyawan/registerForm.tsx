"use client"
import axios from "axios"
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CircleDashedIcon, EyeIcon, EyeOff, ShieldQuestionIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { boothProps } from "@/types"

const RegisterForm = () => {
    // toggle hint password
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [modalGenerateId, setModalGenerateId] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullname: "",
        karyawanId: "",
        image: "",
        role: "",
        location: "",
        password: "",
        confPassword: "",
    })

    const [dataId, setDataId] = useState({
        firstname: "",
        month: 0,
        year: 0
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const openModalGenerateId = () => {
        setModalGenerateId(true)
    }

    const copyValue = async (karyawanId: string, password: string) => {
        const value = `karyawanId: ${karyawanId}, password: ${password}`
        const copy = await navigator.clipboard.writeText(value)
        return copy
    }

    // register
    const Register = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/auth/register', {
                fullname: formData.fullname,
                karyawanId: formData.karyawanId,
                image: formData.image,
                role: formData.role,
                password: formData.password,
                confPassword: formData.confPassword,
                location: formData.location
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            toast({
                title: "berhasil menambahkan karyawan",
                description: `karyawanId: ${response.data.karyawanId}, password: ******`,
                duration: 10000,
                action: <ToastAction altText="copy" onClick={() => copyValue(response.data.karyawanId, formData.password)}>copy</ToastAction>
            })
            console.log(response.data);
            return router.push('/dashboard/karyawan/list')
        } catch (error: any) {
            console.log(error)
            toast({
                description: error.response.data,
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    }

    const generateKaryawanId = () => {
        const firstname = dataId.firstname;
        const month = dataId.month;
        const year = dataId.year;

        const result = `${firstname}${month}${year}`
        setFormData((value) => ({
            ...value,
            karyawanId: result
        }));
        console.log("result karyawan id", result);
        return setModalGenerateId(false)
    }
    const [booths, setBooths] = useState<boothProps[]>([]);
    useEffect(() => {
        const getBoothLocation = async () => {
            await axios.get('/api/booth/get').then(response => {
                console.log(response.data);
                setBooths(response.data)
                return response.data    
            }).catch(error => {
                console.log(error)
                return;
            })
        }

        getBoothLocation();
    }, [])

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                Register();
            }}>
                <div className='w-full md:flex items-center md:space-x-3'>
                    <div className='md:w-1/2 space-y-2'>
                        <Label htmlFor='fullname'>Nama Lengkap Karyawan</Label>
                        <Input typeof='text' placeholder='masukan nama lengkap karyawan'
                            value={formData.fullname}
                            onChange={(e) => {
                                setFormData((value) => ({
                                    ...value,
                                    fullname: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 space-y-2'>
                        <Label htmlFor='karyawanId'>KaryawanId</Label>
                        <div className='relative'>
                            <Input className='relative' typeof='text' placeholder='masukan karyawan id'
                                value={formData.karyawanId}
                                onChange={(e) => {
                                    setFormData((value) => ({
                                        ...value,
                                        karyawanId: e.target.value
                                    }))
                                }}
                            />
                            <div className='absolute bottom-0 right-0 bg-primary rounded-md p-2.5 cursor-pointer' onClick={openModalGenerateId}>
                                <ShieldQuestionIcon className='icon-size' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full md:flex items-center md:space-x-3'>
                    <div className='md:w-1/2 space-y-2'>
                        <Label htmlFor='role'>Role</Label>
                        <Select defaultValue="" onValueChange={(e: string) => {
                            console.log(e)
                            setFormData((value) => ({
                                ...value,
                                role: e
                            }))
                        }}>
                            <SelectTrigger>
                                <SelectValue defaultValue="" placeholder="pilih role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Owner">Owner</SelectItem>
                                <SelectItem value="Karyawan">Karyawan</SelectItem>
                                <SelectItem value="Freelance">Freelance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:w-1/2 space-y-2">
                    <Label htmlFor='location'>Lokasi</Label>
                        <Select defaultValue="" onValueChange={(e: string) => {
                            console.log(e)
                            setFormData((value) => ({
                                ...value,
                                location: e
                            }))
                        }}>
                            <SelectTrigger>
                                <SelectValue defaultValue="" placeholder="pilih role" />
                            </SelectTrigger>
                            <SelectContent>
                               {booths.map((booth) => (
                                 <SelectItem key={booth.id} value={booth.location}>
                                    {booth.location}
                                 </SelectItem>
                               ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='w-full md:flex items-center md:space-x-3'>
                    <div className='md:w-1/2 space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <div className='relative'>
                            <Input className='relative'
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData((value) => ({
                                        ...value,
                                        password: e.target.value
                                    }))
                                }}
                                placeholder='masukan password' />
                            <div className='absolute bottom-0 right-0 bg-primary rounded-md p-2.5 cursor-pointer' onClick={toggleShowPassword}>
                                {showPassword ? (
                                    <EyeIcon className='icon-size' />
                                ) : (
                                    <EyeOff className='icon-size' />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='md:w-1/2 space-y-2'>
                        <Label htmlFor='confPassword'>Konfirmasi Password</Label>
                        <div className='relative'>
                            <Input className='relative'
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confPassword}
                                onChange={(e) => {
                                    setFormData((value) => ({
                                        ...value,
                                        confPassword: e.target.value
                                    }))
                                }}
                                placeholder='masukan konfirmasi password' />
                            <div className='absolute bottom-0 right-0 bg-primary rounded-md p-2.5 cursor-pointer' onClick={toggleShowConfirmPassword}>
                                {showConfirmPassword ? (
                                    <EyeIcon className='icon-size' />
                                ) : (
                                    <EyeOff className='icon-size' />
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <CardFooter className='flex items-center mt-5 justify-end'>
                    <Button disabled={loading}>
                        {loading && (
                            <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {loading ? "Loading..." : "Simpan"}
                    </Button>
                </CardFooter>
            </form>

            {/* modal guide generate id untuk karyawan  */}
            <Dialog open={modalGenerateId} onOpenChange={setModalGenerateId}>
                <DialogContent>
                    <DialogDescription>

                    </DialogDescription>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        generateKaryawanId();
                    }}>
                        <div>
                            <Label>nama depan karyawan</Label>
                            <Input type='text'
                                className='w-full mt-1'
                                placeholder='masukan nama depan si karyawan'
                                value={dataId.firstname}
                                onChange={(e) => {
                                    setDataId((value) => ({
                                        ...value,
                                        firstname: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className='flex items-center space-x-5 w-full'>
                            <div className='mt-2 w-full'>
                                <Label>bulan masuk</Label>
                                <Input type='number'
                                    className='w-full mt-1'
                                    placeholder='masukan bulan masuknya karyawan'
                                    value={dataId.month}
                                    onChange={(e) => {
                                        setDataId((value: any) => ({
                                            ...value,
                                            month: e.target.value
                                        }))
                                    }}
                                />
                            </div>

                            <div className='mt-2 w-full'>
                                <Label>tahun masuk</Label>
                                <Input type='number'
                                    className='w-full mt-1'
                                    placeholder='masukan tahun masuknya karyawan'
                                    value={dataId.year}
                                    onChange={(e) => {
                                        setDataId((value: any) => ({
                                            ...value,
                                            year: e.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>

                        <DialogFooter className='text-xs md:text-sm text-center border-t pt-2'>
                            Kombinasikan nama depan + 2 digit bulan masuk karyawan + 2 digit tahun masuk karyawan

                            <div className='mb-10'>
                                <Button className='w-full'>
                                    Simpan
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default RegisterForm