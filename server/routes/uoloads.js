const express = require("express");
const router = express.Router()
const cloudinary = require('cloudinary').v2;
const {config} = require('../config/secret');
const { auth } = require("../middlewares/auth");

cloudinary.config({
    cloud_name: 'dbdf61pqo',
    api_key: '743658941816974',
    api_secret: config.CLOUD_SECRET,
    secure:true
  });

router.post("/cloud_server", async (req, res) => {
  try {
    const myFile = req.body.myFile;
    if (myFile) {
      const data = await cloudinary.uploader.upload(myFile, { unique_filename: true });
      res.json(data);
    } else {
      res.status(400).json({ error: "No file provided." });
    }
  } catch (err) {
    console.log("Error:", err.message);
    res.status(502).json({ error: "Error uploading file to Cloudinary." });
  }
});


module.exports = router