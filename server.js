const express = require("express")
const bodyParser = require("body-parser")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const productsRoute = require("./routes/productsRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")
const path = require("path")
const cors = require("cors")

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use("/api/products", productsRoute)
app.use("/api/users/", userRoute)
app.use("/api/orders/", orderRoute)

app.get("/", (req,res)=>{
    res.send("Home page")
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI, {useUnifiedTopology : true, useNewUrlParser : true})
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })



// mongodb+srv://MERN-Ecommerce-User:MERN-Ecommerce-User @matiasdemarchicluster.3jeamsb.mongodb.net/MERN-Ecommerce?retryWrites=true&w=majority