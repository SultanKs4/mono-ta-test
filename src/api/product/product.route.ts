import { Router } from "express"
import { index, detail, store, update, remove, restore } from "./product.controller"

const productRouter = Router()

productRouter.get("/", index)
productRouter.get("/:id", detail)
productRouter.post("/", store)
productRouter.put("/:id", update)
productRouter.delete("/:id", remove)
productRouter.delete("/restore/:id", restore)

export default productRouter
