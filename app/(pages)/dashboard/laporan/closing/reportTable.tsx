"use client"
import { toast } from "@/components/ui/use-toast"
import { formatNominal } from "@/lib/formatter/formatCurrency"
import axios from "axios"
import { useRouter } from "next/navigation"
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
import { reportOrdersProps, reportSummaryProps } from "@/types"
import { DatePicker } from "./datePicker"
import { SubmitReport } from "./submitReport"
import { generateTrackingId } from "@/lib/generator/generateUniqueId"
import UpdateStokComponent from "./updateStok"



export const ReportTable = ({ location }: { location: string }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [dataOrders, setDataOrders] = useState<reportOrdersProps[]>([]);
    const [summary, setSummary] = useState<reportSummaryProps>({
        _count: 0,
        _sum: {
            priceTotal: 0,
            quantityTotal: 0
        }
    });
    const [date, setDate] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    const getDataDailyOrderan = async () => {
        try {
            const response = await axios.post('/api/report/getDailyOrder', {
                date: date,
                location: location
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            setDataOrders(response.data.data);
            setSummary(response.data.summary)
            console.log("data orderan hari ini", response.data)
            return response.data
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.response.data.message,
                description: error.message,
                variant: 'destructive'
            });
            return;
        }
    }
    useEffect(() => {
        getDataDailyOrderan();
        // getRecaptRevenue();
    })
    const selectedDate = (date: any) => {
        setDate(date.toString())
    }

    const handleSuccessUpdateStok = (value: string) => {
        console.log("update stok", value)
        setDisableButton(false)
    }

    return (
        <div className="flex items-center flex-col w-full space-x-4">
            <div>
              <UpdateStokComponent location={location} label="Update Stok" onSuccess={handleSuccessUpdateStok} />
            </div>
            <div className="mb-5">
                <DatePicker onSelectedDate={selectedDate} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="truncate">
                        <TableHead>No Orderan</TableHead>
                        <TableHead className="w-[200px]">Produk Terjual</TableHead>
                        <TableHead>Quantity Total</TableHead>
                        <TableHead>Harga Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataOrders.map((item, index: number) => (
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
            )}

            {dataOrders.length <= 0 ? (
                <></>
            ) : (
                <div className="mt-10">
                    <SubmitReport
                        date={date}
                        idTracking={generateTrackingId(new Date())}
                        location={location}
                        quantityTotal={summary._sum.quantityTotal}
                        revenueTotal={summary._sum.priceTotal}
                        disable={disableButton}
                    />
                </div>
            )}

        </div>
    )
}