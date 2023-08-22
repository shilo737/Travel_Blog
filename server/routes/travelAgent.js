const express = require("express");
const { getAllTravelAgent, addTravelAgent, deleteTravelAgent } = require("./controllers/travelAgentControllers");
const { authAdmin } = require("../middlewares/auth");
const router = express.Router()

router.get("/",getAllTravelAgent)

router.post("/",authAdmin,addTravelAgent)

router.delete("/:id",authAdmin ,deleteTravelAgent)



module.exports = router