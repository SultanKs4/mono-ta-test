import { SoftDeleteDocument } from "mongoose-delete"

export interface IProduct extends SoftDeleteDocument {
    name: string
    description: string
    category: string
    image_url: string[]
    color: string
    size: string
    stock: number
    price: number
    weight: number
}

export type ProductRequest = IProduct
