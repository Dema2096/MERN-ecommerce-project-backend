const mongoose = require("mongoose")


mongoose.connect(process.env.mongo_url, {useUnifiedTopology : true, useNewUrlParser : true})

const connection = mongoose.connection

connection.on("error",()=>{
    console.error("Error al conectarse a database")
})

connection.on("connected",()=>{
    console.log("Conectado a databse")
})

module.exports = mongoose