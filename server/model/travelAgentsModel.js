const mongoose = require("mongoose");
const Joi = require("joi");

const travelAgentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    about: String,
    LinkToTheCompany:String,
    profile :{
        type:String,
        default:"https://img.freepik.com/free-vector/travel-agent-abstract-illustration_335657-4589.jpg?size=626&ext=jpg&uid=R112873048&ga=GA1.2.1208200538.1686835925&semt=ais"
    }
},{ timestamps: true })

exports.TravelAgentsModel = mongoose.model("travelAgent",travelAgentSchema)

exports.validateTravelAgent = (_bodyData) =>{
    const joiSchema = Joi.object({
        name:Joi.string().min(2).max(30).required(),
        phone:Joi.string().min(4).max(20).required(),
        about:Joi.string().min(2).max(200).required(),
        LinkToTheCompany:Joi.string().min(2).max(200),
        profile:Joi.string().max(2000).allow(null,"")
    })
    return joiSchema.validate(_bodyData);
}