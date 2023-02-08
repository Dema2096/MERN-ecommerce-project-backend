const { response } = require("express")
const {v4 : uuidv4} = require("uuid")
const express = require("express")
const router = express.Router()
const stripe = require("stripe")("sk_test_51MCbiMDp3kgXUuHFydV6QpIiRPHGFjQ06DhODUrFSNS1YGAqvATPSPORPPtqNqISQy4sGBePzCnkOXI4GBBcBr7F00ui5lBZLY")
const Order = require("../models/orderModel")

router.post("/placeorder", async(req,res)=>{
    const {token, cartItems, currentUser, subtotal} = req.body

    const customer = await stripe.customers.create({
        email: token.email,
        source : token.id,
    })

    const payment = await stripe.charges.create({
        amount : subtotal*100,
        currency : "ars",
        customer: customer.id,
        receipt_email : token.email
    }, {
        idempotencyKey : uuidv4()
    })

    if(payment){
        const order = new Order({
            userId: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            orderItems : cartItems,
            shippingAdress: {
                address: token.card.address_line1,
                city: token.card.address_city,
                postalCode: token.card.address_zip,
                country: token.card.address_country
            },
            orderAmount:subtotal,
            transactionId: payment.source.id,
            isDelivered: false
        })

        order.save(err=>{
            if(err){
                return res.status(400).json({message: "Falla en el pago"})
            }else{
                res.send("Pago registrado con exito")
            }
        })
    }else{
        return res.status(400).json({message: "Falla en el pago"})
    }
})

router.post("/getordersbyuserid", (req,res)=>{

    const userId = req.body.userId

    Order.find({userId: userId}, (err, docs)=>{
        if(err){
            return res.status(400).json({message: "Falla al querer realizar el pago"})
        }else{
            res.send(docs)
        }

    })

})


router.post("/getorderbyid", (req,res)=>{

    const orderid = req.body.orderid

    Order.find({_id: orderid}, (err, docs)=>{
        if(err){
            return res.status(400).json({message: "Algo fallo, intente mas tarde"})
        }else{
            res.send(docs[0])
        }

    })

})


router.get("/getallorders",(req,res)=>{
    Order.find({},(error, docs)=>{
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


module.exports = router