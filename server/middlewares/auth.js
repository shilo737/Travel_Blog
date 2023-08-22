const jwt = require("jsonwebtoken");
const {config} = require('../config/secret')

exports.auth = (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You need send token" });
  }
  try {
    const decodeToken = jwt.verify(token, config.TOKEN_SECRET);
    req.tokenData = decodeToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "token invalid or expired" });  
  }
};

exports.authAdmin = (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You need send token admin" });
  }
  try {
    const decodeToken = jwt.verify(token, config.TOKEN_SECRET);
    if (decodeToken.role != "admin" && decodeToken.role != "superadmin") {
      return res
        .status(401)
        .json({ err: "You must be admin in this endpoint" });
    }
    req.tokenData = decodeToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "token invalid or expired" });
  }
};
