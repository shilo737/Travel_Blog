const express = require("express")
const path = require("path")
const http = require("http");
const fileupload = require("express-fileupload")
require("./db/mongoConnect")
const { routesInit } = require("./routes/configRouters");
const cors = require("cors")


const app = express()

app.use(cors())


app.use(fileupload({
limits:{
    fileSize:"5mb"},
    useTempFiles:true
}))

app.use(express.json({limit:"5mb"}))

routesInit(app)

const server = http.createServer(app)


server.listen(3004)