import HttpException from "../../utils/httpException"
import productModel from "../product/product.model"
import orderModel from "./order.model"
import { Order } from "./order.type"

export async function getAllOrder(page: number = 0) {
    try {
        let limit = 10
        let order = await orderModel
            .find({}, null, {
                skip: page * limit,
                limit: limit,
            })
            .select("items total_price status")
            .exec()

        if (order.length == 0) {
            throw new HttpException(404, "this page don't have data")
        }
        return order
    } catch (error: any) {
        throw error
    }
}

export async function getDetailOrder(id: string) {
    try {
        const order = await orderModel.findOneWithDeleted({ _id: id }).exec()
        if (!order) {
            throw new HttpException(404, "order id not found")
        }
        return order
    } catch (error: any) {
        throw error
    }
}

export async function storeOrder(order: Order) {
    try {
        order.total_price = 0
        for await (const item of order.items) {
            const product = await productModel.findById(item.product_id)
            if (!product) {
                throw new HttpException(404, "product id not found")
            }
            item.weight = item.unit * product.weight
            item.order_price = item.unit * product.price
            order.total_price += item.order_price
        }
        order.total_price += order.courier_price
        return await orderModel.create(order)
    } catch (error: any) {
        throw error
    }
}
