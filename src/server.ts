import { config } from "dotenv"
config()

import { connectDb } from "./utils/database"
import app from "./app"

const port = process.env.PORT || 3000

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`API listen at port ${port}`)
        })
    })
    .catch((err: string) => {
        console.error(err)
    })
