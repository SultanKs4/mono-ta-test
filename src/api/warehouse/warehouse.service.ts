import { Types } from "mongoose"
import HttpException from "../../utils/httpException"
import productModel from "../product/product.model"
import warehouseModel from "./warehouse.model"
import { WarehouseRequest } from "./warehouse.type"

export async function getAllWarehouse(page: number = 0) {
    try {
        let limit = 10
        let warehouse = await warehouseModel
            .find({}, null, {
                skip: page * limit,
                limit: limit,
            })
            .select("name")
            .exec()

        if (warehouse.length == 0) {
            throw new HttpException(404, "this page don't have data")
        }
        return warehouse
    } catch (error: any) {
        throw error
    }
}

export async function getDetailWarehouse(id: string) {
    try {
        const warehouse = await warehouseModel.findOneWithDeleted({ _id: id }).exec()
        if (!warehouse) {
            throw new HttpException(404, "warehouse id not found")
        }
        return warehouse
    } catch (error: any) {
        throw error
    }
}

export async function storeWarehouse(warehouse: WarehouseRequest) {
    try {
        return await warehouseModel.create(warehouse)
    } catch (error: any) {
        throw error
    }
}

export async function storeProduct(id: string, product_id: Types.ObjectId) {
    try {
        const warehouse = await warehouseModel.findById({ _id: id }).exec()
        if (!warehouse) {
            throw new HttpException(404, "warehouse id not found")
        }
        const product = await productModel.findById({ _id: product_id }).exec()
        if (!product) {
            throw new HttpException(404, "product id not found")
        }
        if (warehouse.product_list.includes(product._id)) {
            throw new HttpException(409, "product id already exist in warehouse")
        }
        warehouse.product_list.push(product._id)
        warehouse.save()
        return warehouse
    } catch (error: any) {
        throw error
    }
}
