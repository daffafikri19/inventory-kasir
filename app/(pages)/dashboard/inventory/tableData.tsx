import { Icons } from "@/components/global/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatUpdatedAt } from "@/lib/formatter/formatDate";
import { StokType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const TableData = ({ selectedBooth }: { selectedBooth: string }) => {
    const [dataTable, setDataTable] = useState<StokType[]>([])
    const [updatedAt, setUpdatedAt] = useState('');
    useEffect(() => {
        const getDataTable = async () => {
            try {
                const response = await axios.post('/api/inventory/get', {
                    location: selectedBooth
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const dataToArray = [
                    response.data
                ]
                const updatedAt: string = response.data.updatedAt
                setUpdatedAt(updatedAt);
                setDataTable(dataToArray);
                return dataToArray
            } catch (error) {
                console.log(error);
                return;
            }
        }

        getDataTable();
    }, [selectedBooth])

    return (
        <div className="my-5 w-full">
            <div className="w-full py-3">
                <Input className="text-xs" readOnly value={"Perubahan terakhir : " + updatedAt} />
            </div>
            <Card className="flex-1">
                <CardContent className="">
                    {dataTable.map((data) => (
                        <RadioGroup className="grid grid-cols-2 flex-1" key={data.boothId}>
                            {Object.keys(data).map((key) => (
                                <RadioGroupItem key={key} value={key} className="peer sr-only" />
                            ))}
                            {Object.keys(data).map((value) => (
                                <>
                                    <Label
                                        key={value}
                                        htmlFor="card"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary space-y-4 text-xs"
                                    >
                                        <span>{value}</span>
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-xl text-center">{data[value]}</span>
                                        </div>
                                    </Label>
                                </>
                            ))}
                        </RadioGroup>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
