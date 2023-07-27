import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema ({
    name:{ type: String, required:true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true}
})
 productsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model (
    'products', productsSchema
)