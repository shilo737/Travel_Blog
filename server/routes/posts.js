const express = require("express");
const { getAllPost, addPost, putPost, deletePost, getMyPost, toggleFav, getMyFavorite, getOnePostById } = require("./controllers/postControllers");
const { auth } = require("../middlewares/auth");
const { addComment, deleteComment } = require("./controllers/commentsControllers");
const router = express.Router()


router.get("/", getAllPost);

router.get("/myPosts", auth, getMyPost);

router.get("/postInfo/:id", getOnePostById)

router.post("/",auth ,addPost);

router.put("/:id", auth , putPost);
 
router.delete("/:id",auth, deletePost);

router.patch("/favorite/:id",auth, toggleFav);

router.get("/favorite", auth, getMyFavorite)

router.post("/comment/:post_id" , auth ,addComment)

router.delete("/deleteComment/:post_id/:comment_id",auth,deleteComment)





module.exports = router 