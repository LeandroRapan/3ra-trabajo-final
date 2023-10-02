import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }]
}, { timestamps: true });

cartSchema.pre('find', function(){
    this.populate('products')
})

export const cartModel = mongoose.model('cart', cartSchema);