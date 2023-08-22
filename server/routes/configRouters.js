const indexR = require("./index")
const usersR = require("./users")
const postR = require("./posts")
const uploadsR = require("./uoloads")
const travelAgents = require("./travelAgent")


exports.routesInit = (app) => {
app.use("/",indexR)
app.use("/users",usersR)
app.use("/posts",postR)
app.use("/uploads",uploadsR)
app.use("/travelAgents",travelAgents)
}