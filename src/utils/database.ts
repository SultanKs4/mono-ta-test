import mongoose from "mongoose"

const conn = process.env.DB_CONN || ""

export async function connectDb() {
    try {
        if (conn == "") throw new Error("connection string empty")
        return mongoose.connect(conn)
    } catch (error) {
        throw error
    }
}
