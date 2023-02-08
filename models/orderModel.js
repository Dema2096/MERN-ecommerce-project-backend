const { Double } = require("bson")
const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")

const orderSchema = mongoose.Schema({

    userId: {
        type: String,
        require
    },
    name:{
        type: String,
        require
    },
    email:{
        type: String,
        require
    },
    orderItems:[{
        name : {type:String, require},
        quantity: {type:Number, require},
        _id:{type:String, require},
        price:{type:Number, require}
    }],
    shippingAdress: {
        address : {type: String, require},
        city: {type:String, require},
        postalCode: {type:Number, require},
        country: {type:String, require}
    },
    orderAmount:{
        type: Number,
        require
    },
    transactionId:{
        type:String, 
        require
    },
    isDelivered:{type:Boolean, require}
},
{
    timestamps : true
})


const Order = mongoose.model("orders",orderSchema)

module.exports = Order