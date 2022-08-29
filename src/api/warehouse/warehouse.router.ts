import { Router } from "express"
import { detail, index, store, addProduct } from "./warehouse.controller"

const warehouseRoute = Router()

warehouseRoute.get("/", index)
warehouseRoute.get("/:id", detail)
warehouseRoute.post("/", store)
warehouseRoute.post("/product/:id", addProduct)

export default warehouseRoute
