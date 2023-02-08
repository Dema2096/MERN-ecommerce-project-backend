const { response } = require("express")
const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const mongoose = require("mongoose")
const { copyFileSync } = require("fs")

router.post("/register", (req, res) => {

    User.find({ email: req.body.email}, (err, docs) => {
        if (docs.length > 0) {
            return res.status(400).json({message:"Algo salio mal"})
        } else {
            const newuser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            newuser.save(err => {
                if (!err) {
                    res.send("Usuario creado con exito")
                } else {
                    res.send("Algo salio mal")
                }
            })
        }

        if (err) {
            return res.status(400).json({message:"Algo salio mal"})
        }
    })
})


router.post("/login",(req,res)=>{
    User.find({email:req.body.email,password:req.body.password},(err,docs)=>{
        if(docs.length>0){
            const user = {
                _id:docs[0]._id,
                name:docs[0].name,
                email:docs[0].email
            }
            res.send(user)
        }else{
            return res.status(400).json({message:"Datos no validos"})
        }
    })
})

router.post('/update', (req,res)=>{
    const {userid, updatedUser} = req.body

    User.findByIdAndUpdate(userid,{
        name : updatedUser.name,
        email : updatedUser.email,
        password : updatedUser.password
    }, (err)=>{
        if(err){
            return res.status(400).json({message:'Algo salio mal, intente mas tarde'} +err)
        }else{
            res.send('Usuario actualizado con exito')
        }
    })
    })


router.get("/getallusers", (req,res)=>{
    User.find({},(err,docs)=>{
        if(err){
            return res.status(400).json({message: "Algo salio mal, intente mas tarde"})
        }else{
            res.send(docs)
        }
    })
} )

router.post("/deleteuser", (req,res)=>{
    User.findByIdAndDelete(req.body.userid, (err)=>{
        if(err){
            return res.status(400).json({message: "Algo salio mal, intente mas tarde"})
        }else{
            res.send("Usuario eliminado con exito")
        }
    })
})

module.exports = router