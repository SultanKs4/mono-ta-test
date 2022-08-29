import { Request, Response } from "express"
import { base } from "../../utils/baseController"
import HttpException from "../../utils/httpException"
import { Types } from "mongoose"

import { getAllWarehouse, getDetailWarehouse, storeProduct, storeWarehouse } from "./warehouse.service"

export async function index(req: Request, res: Response) {
    let fun = async () => {
        let page = Number(req.query.page) - 1
        if (isNaN(page)) {
            page = 0
        }
        if (page < 0) {
            throw new HttpException(404, "page invalid")
        }
        return await getAllWarehouse(page)
    }
    return await base(res, "list warehouse", fun)
}

export async function detail(req: Request, res: Response) {
    let fun = async () => {
        return await getDetailWarehouse(req.params.id)
    }
    return await base(res, "detail warehouse", fun)
}

export async function store(req: Request, res: Response) {
    let fun = async () => {
        return await storeWarehouse(req.body)
    }
    return await base(res, "add warehouse", fun)
}

export async function addProduct(req: Request, res: Response) {
    let fun = async () => {
        let product_id = new Types.ObjectId(req.body.product_id)
        return await storeProduct(req.params.id, product_id)
    }
    return await base(res, "add warehouse", fun)
}
