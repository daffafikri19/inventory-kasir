"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { formatNominal } from "@/lib/formatter/formatCurrency"
import { listOrderanType } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { DatePicker } from "./datePicker"

export const DataOrder = () => {
    const [dataOrders, setDataOrders] = useState<listOrderanType[]>([]);
    const [date, setDate] = useState("");
    const getPenjualanByToday = async () => {
        try {
            const response = await axios.post('/api/order/getByStatusDone', {
                date: date
            });
            setDataOrders(response.data)
            console.log(response.data)
            return response.data
        } catch (error: any) {
            if (error) {
                toast({
                    title: error.response.data.message,
                    description: error.message,
                    variant: 'destructive'
                });
                return;
            }
        }
    }

    useEffect(() => {
        getPenjualanByToday();
    })

    const selectedDate = (date: any) => {
        setDate(date.toString())
    }

    return (
        <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex items-center justify-center">
                <DatePicker onSelectedDate={selectedDate} />
            </div>
            <div>
            {dataOrders.map((data) => (
                <Card className="w-full" key={data.id}>
                <CardContent className="w-full">
                    <div className="w-full space-x-3 border-b pb-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Button variant="secondary" type="button" size="icon">{data.orderNumber}</Button>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-xs">Order ID : </p>
                                    <p className="text-[10px] text-muted-foreground truncate">{data.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-1 border-b pb-1">
                        {data.orderedItem.map((item) => (
                            <div className="flex items-center justify-between" key={item.id}>
                                <div key={item.id} className="flex flex-col space-y-2">
                                    <span>Teh Solo {item.product.variant} {item.product.size}</span>
                                    <span className="text-muted-foreground text-sm">
                                        {item.catatan !== "" ? (
                                            item.catatan
                                        ) : "tidak ada cacatan"}
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-2 items-end">
                                    <span>{formatNominal(item.product.price)}</span>
                                    <span>X {item.quantity.toString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 w-full flex items-center justify-between">
                        <div className="flex flex-col items-start">
                            <span>Total Quantity : {data.quantityTotal}</span>
                            <span>Total Harga : {formatNominal(data.priceTotal)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            ))}
            </div>
        </div>
    )
}