require('dotenv').config()
const mongoose = require ("mongoose")
const express = require ("express")
//APP
const app = express()

//Middlewares
app.use(express.json())

//Destructuración
//Variables de entorno.
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

//Esquema de mongo
const koderSchema = new mongoose.Schema({
    name: {
        type: String,
        minlenght: 3,
        maxlenght: 20,
        required: true,
    },
    modulo: {
        type: String,
    },
    edad: {
        type: Number,
        min: 18,
        max: 150
    },
    generacion: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        enum: ("f", "m", "o")
    },
})

//Modelo -> Colección
const Koder = mongoose.model("koders", koderSchema)

//URL
const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}${DB_HOST}${DB_NAME}`

//Endpoints
app.post("/koders", async (request, response) => {
    //Destructurando
    const { body } = request
    try {
        //Acceder a la base de datos
        const koder =  await Koder.create(body)
        console.log("koder", koder)
        response.status(201)
        response.json({
            success: true,
            data: {
                koder
            }
        })
    } catch(err) {
        console.log("Error", err)
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
})

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