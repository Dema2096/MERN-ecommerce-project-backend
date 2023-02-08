const { Double } = require("bson")
const mongoose = require("mongoose")

const reviewsSchema = new mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId
    },
    name : {
        type:String,
        required : true
    },
    comment:{
        type:String,
    },
    rating:{
        type: Number,
        required : true
    }
}, {
    timeStamps : true
})


const productSchema = new mongoose.Schema({

    ratings: {
        type : Number,
        require :true,
        default : 0
    },
    price: {
        type : Number,
        require : true

    },
    countInStock: {
        type: Number,
        required : true
    },
    name: {
        type : String,
        required: true
    },
    category: {
        type: String,
        required : true

    },
    image: {
        type : String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    reviews:[reviewsSchema]
},{
    timeStamps : true
})


const Product = mongoose.model("products",productSchema)

module.exports = Product