const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const {config} = require('../config/secret')
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage:{
      type:String,
      default:"https://web.ics.purdue.edu/~circlek/IMG/KFR.jpg"
    },
    role:{
      type:String,
      default:"user"
    },
    favorite: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts"
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts"
  }]

  },
  { timestamps: true }
);

exports.UserModel = mongoose.model("users", userSchema);

exports.createToken = (user_id , role) => {
  const token = jwt.sign({_id:user_id,role},config.TOKEN_SECRET,{expiresIn:"60000mins"})
  return token
}

exports.validateUser = (_bodyData) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(50).email().required(),
    password: Joi.string().min(3).max(200).required(),
    profileImage: Joi.string().min(2).max(200).allow(null,''),
  });
  return joiSchema.validate(_bodyData);
};

exports.validateLogin = (_bodyData) => {
  const joiSchema = Joi.object({
    email: Joi.string().min(2).max(50).email().required(),
    password: Joi.string().min(3).max(200).required(),
  });
  return joiSchema.validate(_bodyData);
};
