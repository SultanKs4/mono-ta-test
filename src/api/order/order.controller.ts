import { Request, Response } from "express"
import { base } from "../../utils/baseController"
import HttpException from "../../utils/httpException"
import { getAllOrder, getDetailOrder, storeOrder } from "./order.service"

export async function index(req: Request, res: Response) {
    let fun = async () => {
        let page = Number(req.query.page) - 1
        if (isNaN(page)) {
            page = 0
        }
        if (page < 0) {
            throw new HttpException(404, "page invalid")
        }
        return await getAllOrder(page)
    }
    return await base(res, "list product", fun)
}

export async function detail(req: Request, res: Response) {
    let fun = async () => {
        return await getDetailOrder(req.params.id)
    }
    return await base(res, "detail product", fun)
}

export async function store(req: Request, res: Response) {
    let fun = async () => {
        return await storeOrder(req.body)
    }
    return await base(res, "add product", fun)
}
