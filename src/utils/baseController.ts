import { Response } from "express"
import responseObject from "./responseObject"

export async function base(res: Response, message: string, fun: () => Promise<object> | Promise<void>) {
    let { code, ...response } = responseObject(200, "success", message)
    try {
        const data = await fun()
        if (data instanceof Object) {
            response.data = data
        }
    } catch (error: any) {
        code = error.code || 500
        response.status = "error"
        response.message = error.message
    } finally {
        return res.status(code).json(response)
    }
}
