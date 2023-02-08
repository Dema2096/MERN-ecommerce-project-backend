const express = require("express")
const bodyParser = require("body-parser")
const app = express()
require("dotenv").config()
const dbConfig = require("./config/dbConfig")
const productsRoute = require("./routes/productsRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")
const path = require("path")

app.use(express.json())
app.use(bodyParser.json())
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

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))


// mongodb+srv://MERN-Ecommerce-User:MERN-Ecommerce-User @matiasdemarchicluster.3jeamsb.mongodb.net/MERN-Ecommerce?retryWrites=true&w=majority