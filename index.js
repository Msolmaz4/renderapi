"use strict"

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config({ path: __dirname + '/.env' })
//const HOST = process.env?.HOST || '127.0.0.1'
const PORT =  8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Cors:
const cors = require('cors');
 app.use(cors())
//Default CORS
// app.use(cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
// }))
// app.use(cors({
//     "origin": ["http://localhost:5173","http://localhost:3000","https://stockapplat-oyuf.vercel.app/"],
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",

// }))

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    
    res.send(`
        <h3>Stock Management API Service</h3>
        <hr>
        <p>
            Documents:
            <ul> 
                <li><a href="/documents/swagger">SWAGGER</a></li>
                <li><a href="/documents/redoc">REDOC</a></li>
                <li><a href="/documents/json">JSON</a></li>
            </ul>
        </p>
    `)
})

// Routes:
app.use(require('./src/routes'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log(`${PORT}`))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
//require('./src/helpers/sync')() // !!! It clear database.