import { ObjectId } from "mongoose"
import { SoftDeleteDocument } from "mongoose-delete"

export interface IWarehouse extends SoftDeleteDocument {
    name: string
    product_list: ObjectId[]
}

export type WarehouseRequest = IWarehouse
