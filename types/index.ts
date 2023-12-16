export interface boothProps {
    id: string,
    location: string,
    stok: StokType,
    laporan: [],
    products: ProductType,
    orderan: OrderType,
    user: sessionProps,
    createdAt: string,
    updatedAt: string
}

export interface StokType {
    [key: string]: number | string;
    id: string,
    gula_pasir: number,
    cup_kecil: number,
    cup_besar: number,
    sedotan: number,
    es_batu: number,
    lemon: number,
    jeruk_nipis: number,
    plastik_kecil: number,
    plastik_sedang: number,
    plastik_besar: number,
    boothId: string,
}

export interface ProductType {
    id: string,
    size: string,
    variant: string,
    price: number,
    productImage: string,
}

export interface OrderType {
    id: string,
    orderNumber: number,
    status: string,
    quantityTotal: number,
    priceTotal: number
    orderedItem: OrderedItemType
}

export interface OrderedItemType {
    id: string,
    productId: string,
    product: {
        size: "Kecil" | "Besar",
        variant: "Original" | "Jeruk_Nipis" | "Lemon",
        price: number,
        productImage: string
    },
    quantity: number,
    totalPrice: number,
    catatan: string,
    orderId: string,
    order: {}
}

export interface listOrderanType {
    id: string,
    orderNumber: number,
    status: string,
    quantityTotal: number,
    priceTotal: number,
    orderedItem: [
        {
            productId: string,
            product: {
                id: string,
                size: string,
                variant: string,
                price: number,
                productImage: string
            },
            catatan: string,
            id: string,
            orderId: string,
            orders: [
                {
                    id: string,
                    orderNumber: number,
                    status: string,
                    quantityTotal: number,
                    priceTotal: number
                }
            ],
            quantity: number,
            totalPrice: number
        }
    ],
    _count: {
        orderedItem: number
    },
}

export interface sessionProps {
    image?: string
    fullname: string
    role: string
    karyawanId: string
    location: string
}

export interface reportOrdersProps {
    id: string,
    booth: [
        {
            id: string,
            location: string
        }
    ],
    operator : [
        {
            id: string,
            fullname: string,
            karyawanId: string,
            role: string
        }
    ],
    orderNumber: number,
    orderedItem: [
        {
            id: string,
            catatan: string,
            product: {
                price: number,
                size: string,
                variant: string
            },
            quantity: number,
            totalPrice: number
        }
    ],
    priceTotal: number,
    quantityTotal: number,
    status: string,
    createdAt: string,
    updatedAt: string
}

export interface reportSummaryProps {
    _count: number,
    _sum: {
        priceTotal: number,
        quantityTotal: number
    }
}