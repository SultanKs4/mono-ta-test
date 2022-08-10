import { Router } from "express"
import { detail, index, store } from "./order.controller"

const orderRouter = Router()

orderRouter.get("/", index)
orderRouter.get("/:id", detail)
orderRouter.post("/", store)

export default orderRouter
