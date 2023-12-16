"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { List, ListItem } from "./listSelectedProduct"
import { listOrderanType, OrderedItemType, ProductType, sessionProps } from "@/types"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { removeUndescore } from "@/lib/formatter/formatUnderscore"
import { decrementValue, incrementValue } from "@/lib/product/operations"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateOrderId } from "@/lib/generator/generateOrderId"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"

import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatNominal } from "@/lib/formatter/formatCurrency"


export const ProductList = ({ fullname, karyawanId, role, image, location } : sessionProps ) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({
        id: "",
        size: "",
        variant: "",
        price: 0,
        productImage: "",
    });

    const [quantity, setQuantity] = useState<number>(1);

    const [openOrderedProduct, setOpenOrderedProduct] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            await axios.get('/api/product').then(response => {
                setProducts(response.data)
                setLoading(false)
                return response.data
            }).catch(error => {
                console.log(error)
            })
        }

        fetchProducts();
    }, [])

    const handleSelectedProduct = (value: any) => {
        console.log("value", value);
        setQuantity(1)
        setSelectedProduct(value)
    }

    const handleIncrement = () => {
        setQuantity(incrementValue(quantity));
    }
    const handleDecrement = () => {
        setQuantity(decrementValue(quantity));
    }
    
    // buat orderan
    const [orderedItem, setOrderedItem] = useState<OrderedItemType[]>([]);
    const [catatanOrder, setCatatanOrder] = useState("");
    const [orderId, setOrderId] = useState<string | null>(null);

    const createOrder = async () => {
        const totalPricePerProduct = selectedProduct.price * quantity
        if (quantity <= 0) {
            return;
        }

        try {
            const currentOrderId = orderId || generateOrderId(new Date());
            const response = await axios.post('/api/order/create', {
                productId: selectedProduct.id,
                quantity: quantity,
                totalPrice: totalPricePerProduct,
                catatan: catatanOrder,
                orderId: currentOrderId,
                location: location,
                operator: karyawanId
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            console.log(response.data)
            setOrderedItem(prevOrderedItem => [...prevOrderedItem, response.data])
            setCatatanOrder("")
            setOrderId(currentOrderId);
            return response.data
        } catch (error: any) {
            toast({
                title: 'terjadi error saat membuat orderan',
                description: error.message,
                variant: 'destructive'
            });
            return;
        }
    }

    const cancelOrderan = (id: string) => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => handleDeleteSummary(id)}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <Trash2 className="w-10 h-10" />
                </div>
            </SwipeAction>
        </TrailingActions>
    );
    const handleDeleteSummary = async (id: string) => {
        try {
            await axios.post('/api/order/summary/delete', {
                id: id
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(async response => {
                setListOrderan((prevOrderedItem) => prevOrderedItem.filter((order) => order.id !== id));
                console.log("current list orderan", listOrderan)
                toast({
                    title: 'berhasil delete orderan'
                })
                return response.data
            });
        } catch (error: any) {
            console.error('Error deleting order:', error);
            toast({
                title: 'gagal menghapus orderan',
                description: error.message
            })
        }
    }

    console.log("ordered Item", orderedItem);



    const [orderLoading, setOrderLoading] = useState(false);
    const [listOrderan, setListOrderan] = useState<listOrderanType[]>([])
    const [queueOrderan, setQueueOrderan] = useState<number | null>(0);

    const handleOpenOrderedProduct = () => {
        getListOrderedProduct()
        setOpenOrderedProduct(!openOrderedProduct)
    }


    const createSummaryOrder = async () => {
        // reset orderid generator
        setOrderedItem([])
        setOrderId(null)
        setOrderLoading(true)
        // setOpenOrderedProduct(true)
        getListOrderedProduct();
    }

    const getListOrderedProduct = async () => {
        await axios.get('/api/order/summary').then(response => {
            console.log("response get order list", response.data);
            setOrderLoading(false)
            setListOrderan(response.data)
            setQueueOrderan(response.data.length)
            return response.data
        }).catch((error: any) => {
            console.log(error)
            toast({
                title: 'terjadi kesalahan saat fetch list order',
                description: error.message
            })
            return;
        });
    }


    console.log("list orderan ", listOrderan)

    const handleSelesaiOrderan = async (id: string) => {
        try {
            await axios.post('/api/order/summary/done', {
                id: id
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            toast({
                title: 'berhasil menyelesaikan orderan ini'
            });
            await getListOrderedProduct();
        } catch (error: any) {
            console.log(error)
            toast({
                title: 'terjadi kesalahan saat fetch list order',
                description: error.message
            })
            return;
        }
    }

    return (
        <div className="w-full px-2">
            <div className="w-full overflow-x-scroll">
                {loading ? (
                    <div className="w-full space-x-6 flex items-center overflow-x-scroll">
                        <Skeleton className="rounded-lg min-w-[200px] h-[200px]" />
                        <Skeleton className="rounded-lg min-w-[200px] h-[200px]" />
                        <Skeleton className="rounded-lg min-w-[200px] h-[200px]" />
                    </div>
                ) : (
                    <List selectable onItemClick={handleSelectedProduct}>
                        {products.map((product, index: number) => (
                            <ListItem value={product} key={product.id}>
                                <AspectRatio>
                                    <Image className="object-fill w-full h-full rounded-lg" src={`/images/${product.productImage}`} alt="teh solo" width={200} height={200} priority />
                                </AspectRatio>
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>

            {/* tidak di munculkan ketika user belum select product */}
            {selectedProduct.id ? (
                <>
                    <div className="w-full mt-5 overscroll-none text-center flex items-center justify-center space-x-4">
                        <span className="text-sm truncate">Teh Solo {removeUndescore(selectedProduct.variant)} {selectedProduct.size}</span>
                        <Button size="icon" onClick={handleDecrement}><Minus className="w-4 h-4" /></Button>
                        <Input type="number" className="p-1 w-10 h-10 rounded-md text-center flex items-center justify-center" value={quantity} readOnly />
                        <Button size="icon" onClick={handleIncrement}><Plus className="w-4 h-4" /></Button>
                    </div>
                    <div className="w-full mt-5 overscroll-none space-y-2">
                        <div className="w-full flex items-center space-x-3">
                            <div className="w-1/2">
                                <Label>Variant</Label>
                                <Input readOnly value={selectedProduct.variant} />
                            </div>
                            <div className="w-1/2">
                                <Label>Ukuran</Label>
                                <Input readOnly value={selectedProduct.size} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        <Label>Catatan dari customer (opsional)</Label>
                        <Textarea placeholder="misal: es-nya sedikit saja"
                            value={catatanOrder}
                            onChange={(e) => {
                                setCatatanOrder(e.target.value)
                            }} />
                    </div>

                    <div className="mt-5 flex items-center justify-end space-x-4">
                        <Button onClick={createOrder}>Simpan</Button>
                    </div>

                    {orderedItem && (
                        <div className="mt-5 mb-20 w-full space-y-2">
                            {orderedItem.map((order) => (
                                <Card key={order.id}>
                                    <CardContent
                                        className="w-full">
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex flex-col space-y-2">
                                                <span>Teh Solo {order.product.variant} {order.product.size}</span>
                                                {order.catatan !== "" ? (
                                                    <span className="text-sm">{order.catatan}</span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">tidak ada catatan</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <Badge>X {order.quantity}</Badge>
                                                <Badge>{formatNominal(order.totalPrice)}</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full h-full items-center flex justify-center mt-10">
                    pilih produk untuk menampilkan detail...
                </div>
            )}

            <div className="fixed bottom-0 left-0 py-2 px-4 shadow-lg w-full bg-background z-10 rounded-t-lg">
                <div className="flex items-center justify-between px-4 space-x-4 w-full">
                    <Button size="icon" className="relative" onClick={handleOpenOrderedProduct}>
                        <ShoppingBag className="w-5 h-5" />
                        {queueOrderan !== 0 ? (
                            <span className="absolute -top-1 -right-1 p-2 w-4 h-4 flex items-center justify-center border bg-red-600 rounded-full border-white font-bold text-white dark:text-white text-[7.5px]">
                                {queueOrderan?.toString()}
                            </span>
                        ) : null}
                    </Button>
                    {orderedItem.length > 0 ? (
                        <Button variant="destructive" onClick={createSummaryOrder}>Buat Pesanan</Button>
                    ) : null}
                </div>
            </div>

            <Sheet open={openOrderedProduct} onOpenChange={setOpenOrderedProduct}>
                <SheetContent side="bottom" className="min-h-[80%] max-h-[80%] overflow-y-scroll w-screen">
                    <SheetHeader>
                        {listOrderan.length === 0 ? (
                            null
                        ) : (
                            <SheetTitle>List Orderan Masuk : </SheetTitle>
                        )}
                    </SheetHeader>
                    {orderLoading ? (
                        <div>
                            <Skeleton className="w-full h-[500px] rounded-lg px-4 py-2" />
                        </div>
                    ) : (
                        <div className="w-full space-y-3 mt-3">
                            {listOrderan.length === 0 ? (
                                <div className="w-full h-full mx-auto my-auto flex items-center justify-center">
                                    <p className="text-sm text-muted-foreground">Tidak ada pesanan saat ini</p>
                                </div>
                            ) : (
                                <>
                                    {listOrderan.filter((data) => data.status === "proses").map((data) => (
                                        <SwipeableList key={data.id}>
                                            <SwipeableListItem
                                                className="w-full"
                                                trailingActions={cancelOrderan(data.id)}>
                                                <Card className="w-full">
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
                                                            <div>
                                                                <Button onClick={() => handleSelesaiOrderan(data.id)}>Selesai</Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </SwipeableListItem>
                                        </SwipeableList>
                                    ))}
                                </>
                            )}
                        </div>
                    )}



                    {listOrderan.length === 0 ? (
                        null
                    ) : (
                        <SheetFooter className="mt-5">
                            <p className="text-xs text-muted-foreground">swipe item ke kiri untuk cancel orderan</p>
                        </SheetFooter>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}