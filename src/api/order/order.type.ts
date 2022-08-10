import { ObjectId } from "mongoose"
import { SoftDeleteDocument } from "mongoose-delete"

export interface IItems {
    product_id: ObjectId
    unit: number
    order_price: number
    weight: number
}

export interface IOrder extends SoftDeleteDocument {
    items: IItems[]
    name: string
    address: string
    city: string
    province: string
    postal_code: number
    courier: string
    courier_price: number
    total_price: number
    payment_method: string
    status: string
}

export type Order = IOrder
