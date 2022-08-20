require('dotenv').config()
const mongoose = require ("mongoose")
const express = require ("express")

const app = express()

//Destructuración
//Variables de entorno.
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

//URL
const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}${DB_HOST}${DB_NAME}`

//Conectando a la base de datos
mongoose.connect (URL)
.then(() => {
    console.log("Conectado a la base de datos de mongo")

    //Levantar servidor
    app.listen(8080, () => {
        console.log("Server listening...")
    })
})
.catch((Err) => {
    console.log("Error", Err)
})