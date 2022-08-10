import express, { Request, Response } from "express"
import router from "./config/routes"
import responseObject from "./utils/responseObject"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    const { code, ...obj } = responseObject(200, "success", "Hello")
    res.status(code).json(obj)
})

app.use(router)

export default app
