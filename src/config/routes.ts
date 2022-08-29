import { Router } from "express"
import orderRouter from "../api/order/order.router"
import productRouter from "../api/product/product.route"
import warehouseRoute from "../api/warehouse/warehouse.router"

const router = Router()

router.use("/api/product", productRouter)
router.use("/api/order", orderRouter)
router.use("/api/warehouse", warehouseRoute)

export default router
