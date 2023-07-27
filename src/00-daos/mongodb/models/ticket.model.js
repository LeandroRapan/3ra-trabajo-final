import mongoose from "mongoose";

const ticketSchema= new mongoose.Schema({
    code:{
        type: String,
        unique: true,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    puchaser:{
        type:String,
        required:true,
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'

    }]
    },{timestamps:{createdAt:'puchase_datetime', updatedAt:false}}
)


const ticket = mongoose.model('ticket', ticketSchema)

export default ticket