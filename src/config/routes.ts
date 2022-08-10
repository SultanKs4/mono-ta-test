import { Router } from "express"
import orderRouter from "../api/order/order.router"
import productRouter from "../api/product/product.route"

const router = Router()

router.use("/api/product", productRouter)
router.use("/api/order", orderRouter)

export default router
