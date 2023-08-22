const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location:String,
    main_image: String,
    images:[],
    comments:[],
    category: {
      type: String,
      enum: ["europe", "asia", "africa","north america","south america","antarctica","oceania"]
  },
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  },
  { timestamps: true }
);

exports.PostModel = mongoose.model("posts", postSchema);

exports.validatePost = (_bodyData) => {
  const joiSchema = Joi.object({
   title: Joi.string().min(2).max(200).required(),
   description: Joi.string().min(2).max(10000).required(),
   location: Joi.string().min(2).max(200).required(),
   main_image: Joi.string().max(2800).allow(null,""),
   images: Joi.array().max(2800).allow(null,""),
   category:Joi.string().valid("europe", "asia", "africa","north america","south america","antarctica","oceania").required() 
  });
  return joiSchema.validate(_bodyData);
};
