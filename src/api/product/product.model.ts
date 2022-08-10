import { Schema, model, Query, HydratedDocument } from "mongoose"
import MongooseDelete, { SoftDeleteModel } from "mongoose-delete"
import { IProduct } from "./product.type"

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image_url: { type: [String], required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        weight: { type: Number, required: true },
    },
    { timestamps: true }
)

productSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: true })
export default model<IProduct>("Project", productSchema) as SoftDeleteModel<IProduct>
// export default model<IProduct>("Project", productSchema)
