import { Request, Response } from "express"
import { base } from "../../utils/baseController"
import HttpException from "../../utils/httpException"
import { getAllProduct, storeProduct, getDetailProduct, updateProduct, deleteProduct, restoreProduct } from "./product.service"

export async function index(req: Request, res: Response) {
    let fun = async () => {
        let page = Number(req.query.page) - 1
        let deleted = req.query.deleted == "yes" ? true : false
        if (isNaN(page)) {
            page = 0
        }
        if (page < 0) {
            throw new HttpException(404, "page invalid")
        }
        return await getAllProduct(page, deleted)
    }
    return await base(res, "list product", fun)
}

export async function detail(req: Request, res: Response) {
    let fun = async () => {
        return await getDetailProduct(req.params.id)
    }
    return await base(res, "detail product", fun)
}

export async function store(req: Request, res: Response) {
    let fun = async () => {
        return await storeProduct(req.body)
    }
    return await base(res, "add product", fun)
}

export async function update(req: Request, res: Response) {
    let fun = async () => {
        return await updateProduct(req.params.id, req.body)
    }
    return await base(res, "update product", fun)
}

export async function remove(req: Request, res: Response) {
    let fun = async () => {
        const deleted = await deleteProduct(req.params.id)
        if (!deleted) {
            throw new HttpException(404, "data not deleted")
        }
    }
    return await base(res, "deleteted product", fun)
}

export async function restore(req: Request, res: Response) {
    let fun = async () => {
        return await restoreProduct(req.params.id)
    }
    return await base(res, "restored product", fun)
}
