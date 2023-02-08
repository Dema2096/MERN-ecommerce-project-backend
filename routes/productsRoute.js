const { response } = require("express")
const express = require("express")
const router = express.Router()
const Product = require("../models/productsModel")


router.get("/getallproducts",(req,res)=>{
    Product.find({},(error, docs)=>{
        if(!error){
            return res.send(docs)
        }
        else{
            return res.status(400).json({
                message : "Error bad request"
            })
        }
    })
})

router.post("/getproductbyid",(req,res)=>{
    Product.find({_id:req.body.productid},(err,docs)=>{
        if(!err){
            return res.send(docs[0])
        }else{
            return res.status(400).json({
                message : "Error bad request"
            })
        }
    })
})

router.post("/addreview",async(req,res)=>{
    const {review, productid, currentUser} = req.body

    const product = await Product.findById({_id : productid})

    const reviewModel = {
        name : currentUser.name,
        userid : currentUser._id,
        rating : review.rating,
        comment : review.comment
    }

    product.reviews.push(reviewModel)

    let rating = product.reviews.reduce((acc, x)=>acc + x.rating , 0) / product.reviews.length

    product.ratings = rating

    

    product.save(err=>{
        if(err){
            return res.status(400).json({message : "Algo salio mal, intente mas tarde" + err})
        }else{
            res.send ('Opinion compartida con exito')
        }
    })
    
})

router.post("/deleteproduct", (req,res)=>{
    Product.findByIdAndDelete(req.body.productid, (err)=>{
        if(err){
            return res.status(400).json({message: "Algo salio mal, intente mas tarde" + err})
        }else{
            res.send("Producto eliminado con exito")
        }
    })
})

router.post("/addproduct", (req,res)=>{

    const {product} = req.body

    console.log(product)

    const productModel = new Product({
        name : product.name,
        price : product.price,
        countInStock : product.countInStock,
        image : product.image,
        description : product.description,
        category : product.category
    })

    productModel.save(err=>{
        if(err){
            return res.status(400).json({message:"Algo salio mal, intente nuevamente mas tarde"})
        }else{
            res.send("Producto creado con exito")
        }
    })


})


router.post('/updateproduct', (req,res)=>{

    Product.findByIdAndUpdate(req.body.productid,{
        name : req.body.updatedProduct.name,
        price : req.body.updatedProduct.price,
        description : req.body.updatedProduct.description,
        countInStock : req.body.updatedProduct.countInStock,
        category : req.body.updatedProduct.category,
        image : req.body.updatedProduct.image
    }, (err)=>{
        if(err){
            return res.status(400).json({message:'Algo salio mal, intente mas tarde'} +err)
        }else{
            res.send('Producto actualizado con exito')
        }
    })
    })



module.exports = router

