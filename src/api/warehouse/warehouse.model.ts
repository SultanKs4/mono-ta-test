import { Schema, model, Query, HydratedDocument } from "mongoose"
import MongooseDelete, { SoftDeleteModel } from "mongoose-delete"
import { IWarehouse } from "./warehouse.type"

const warehouseSchema = new Schema<IWarehouse>(
    {
        name: { type: String, required: true },
        product_list: { type: [Schema.Types.ObjectId] },
    },
    { timestamps: true }
)

warehouseSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: true })
export default model<IWarehouse>("Warehouse", warehouseSchema) as SoftDeleteModel<IWarehouse>
