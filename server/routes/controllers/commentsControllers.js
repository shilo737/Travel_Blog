const { PostModel } = require("../../model/postModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    body:String,
  },{ timestamps: true }
);
const commentModel = mongoose.model("comment",commentSchema);


exports.addComment = async (req, res) => {
  try {
    const { body } = req.body; 
    const { post_id } = req.params; 
    const { _id: user_id } = req.tokenData; 
    const comment = new commentModel({ user_id, body });
    await comment.save()
    await PostModel.findByIdAndUpdate(post_id, {$push: { comments: comment }})
    res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.deleteComment = async (req, res) => {
    const { post_id, comment_id } = req.params
    try{
        const comment = await PostModel.findByIdAndUpdate(post_id, {$pull : {comments: {_id : new ObjectId(comment_id)}}})
        // console.log(comment.comments[0]._id === new ObjectId(comment_id));
        // console.log(comment.comments[0]._id)
        console.log(comment_id);
        res.json({comment ,msg : "Comment deleted successfully"})
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
}