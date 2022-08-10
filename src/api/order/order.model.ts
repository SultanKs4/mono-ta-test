import { model, Schema } from "mongoose"
import MongooseDelete, { SoftDeleteModel } from "mongoose-delete"
import { IItems, IOrder } from "./order.type"

const itemsSchema = new Schema<IItems>({
    product_id: { type: Schema.Types.ObjectId, required: true },
    unit: { type: Number, required: true },
    order_price: { type: Number, required: true },
    weight: { type: Number, required: true },
})

const orderSchema = new Schema<IOrder>(
    {
        items: { type: [itemsSchema], required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        postal_code: { type: Number, required: true },
        courier: { type: String, required: true },
        courier_price: { type: Number, required: true },
        total_price: { type: Number, required: true, default: 0 },
        payment_method: { type: String, required: true },
        status: { type: String, required: true, default: "PAYMENT PENDING" },
    },
    { timestamps: true }
)

orderSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: true })
export default model<IOrder>("Order", orderSchema) as SoftDeleteModel<IOrder>
