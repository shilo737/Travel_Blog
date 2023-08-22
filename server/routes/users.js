const express = require("express");
const { auth, authAdmin } = require("../middlewares/auth");
const router = express.Router();
const { getAllUsers, getUserInfo, loginUser, signUpUsers, deleteUser, changeRoleUser, getUsersList, updateProfileImage } = require("./controllers/userControllers");

router.get("/", getAllUsers);

router.get("/userInfo", auth, getUserInfo);

router.get("/usersList",authAdmin, getUsersList)

router.post("/",signUpUsers)

router.post("/login", loginUser);

router.delete("/:id", authAdmin, deleteUser)

router.patch("/updateProfileImage",auth ,updateProfileImage)

router.patch("/changeRole/:id/:role",authAdmin,changeRoleUser)

router.patch("/updatePost",auth, async(req,res)=>{
  try{
    if(!Array.isArray(req.body.favs_ar)){
      return res.status(400).json({msg:"You need to send favs_ar as array"});
    }
    const data = await UserModel.updateOne({_id:req.tokenData._id},{favs_ar:req.body.favs_ar})
    res.json(data)
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


router.get("/checkToken", auth, async (req,res) => {
  res.json({status:true});
})


module.exports = router;
