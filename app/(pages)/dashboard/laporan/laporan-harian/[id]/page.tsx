"use client"
import { toast } from "@/components/ui/use-toast"
import { formatNominal } from "@/lib/formatter/formatCurrency"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { reportOrdersProps } from "@/types"
import { generateTrackingId } from "@/lib/generator/generateUniqueId"



const LaporanHarianIdPage = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [dataReport, setDataReport] = useState<reportOrdersProps>({
        id: "",
        booth: [
            {
                id: '',
                location: ''
            }
        ],
        operator: [
            {
                fullname: "",
                id: "",
                karyawanId: "",
                role: ""
            }
        ],
        orderedItem: [
            {
                catatan: "",
                id: "",
                product: {
                    price: 0,
                    size: "",
                    variant: "",
                },
                quantity: 0,
                totalPrice: 0
            }
        ],
        orderNumber: 0,
        priceTotal: 0,
        quantityTotal: 0,
        status: "",
        updatedAt: "",
        createdAt: ""
    })
    const [disableButton, setDisableButton] = useState(true);

    const getDataReport = async () => {
       try {
            const response = await axios.post('/api/report/getById', {
                id: params.id,
                location: location
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            setDataReport(response.data)
            return response.data
       } catch (error : any) {
            toast({
                title: error.response.data.message,
                description: error.message,
                variant: 'destructive'
            })
            return;
       }
    }
    useEffect(() => {
        getDataReport();
    })

    return (
        <div className="flex items-center flex-col w-full space-x-4">
            {/* <Table>
                <TableHeader>
                    <TableRow className="truncate">
                        <TableHead>No Orderan</TableHead>
                        <TableHead className="w-[200px]">Produk Terjual</TableHead>
                        <TableHead>Quantity Total</TableHead>
                        <TableHead>Harga Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataReport.map((item, index: number) => (
                        <TableRow key={item.id} className="truncate">
                            <TableCell className="text-center text-xl">{item.orderNumber}</TableCell>
                            <TableCell className="flex flex-col space-y-2">
                                {item.orderedItem.map((product) => (
                                    <div key={product.id} className="flex flex-col items-start p-2 border rounded-md">
                                        <p>Teh Solo {product.product.variant} {product.product.size}</p>
                                        <p>Jumlah : {product.quantity} item</p>
                                        <p>Harga : {formatNominal(product.product.price)}</p>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell className="text-center text-xl">{item.quantityTotal} item</TableCell>
                            <TableCell className="text-center text-xl">{formatNominal(item.priceTotal)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {dataOrders.length <= 0 ? (
                <></>
            ) : (
                <div className="mt-5 w-full">
                    <ul className="flex w-full items-center space-x-4 text-sm text-muted-foreground">
                        <li>
                            <p>Total Produk Terjual Hari Ini : </p>
                            <p>Total Pendapatan Hari Ini :</p>
                        </li>
                        <li>
                            <p>: {summary._sum.quantityTotal} Produk</p>
                            <p>: {formatNominal(summary._sum.priceTotal)}</p>
                        </li>
                    </ul>
                </div>
            )}
            {dataOrders.length <= 0 && (
                <p className="mt-10 w-screen flex items-center justify-center text-muted-foreground">tidak ada data yang ditampilkan</p>
            )} */}
        </div>
    )
}

export default LaporanHarianIdPage