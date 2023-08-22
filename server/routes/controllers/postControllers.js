const { PostModel, validatePost } = require("../../model/postModel");
const { UserModel } = require("../../model/userModel");

exports.getAllPost = async (req, res) => {
  try {
    const perPage = req.query.perPage || 9;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? 1 : -1;
    const search = req.query.s;
    const category = req.query.category;
    const user_id = req.query.user_id;

    let filterFind = {};
    if (search) {
      const searchExp = new RegExp(search, "i");
      filterFind = { $or: [{ title: searchExp }, { location: searchExp }] };
    }
    if (category) {
      filterFind = { category };
    }
    if (user_id) {
      filterFind = { user_id };
    }
    const data = await PostModel.find(filterFind).populate({
      path: 'user_id',
      select: 'posts createdAt email profileImage name'
    })
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: reverse });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.getOnePostById = async  (req, res) => {
  const {id} = req.params
  try{
    const data = await PostModel.findOne({_id: id})
    .populate({path:'user_id',select:'createdAt profileImage name email'})
    for (const comment of data.comments) {
    await PostModel.populate(comment,{
    path: 'user_id',
    select: 'createdAt profileImage name',
      });
    }
    if (!data){
      res.status(502).json({err:"post not found or id"});
    }
    res.json(data)
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
}

exports.getMyPost = async (req, res) => {
  try {
    const post = await PostModel.find({ user_id: req.tokenData._id }).populate({
      path: 'user_id',
      select: 'posts createdAt email profileImage name'
    });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.addPost = async (req, res) => {
  try {
    const validBody = validatePost(req.body);
    if (validBody.error) {
      return res.status(400).json({ err: validBody.error.details });
    }
    const post = new PostModel(req.body);
    if (!req.body.main_image || !req.body.main_image.length) {
      post.main_image ="https://meyda.education.gov.il/files/pop/7350/travel_and_transportation.jpg";
    }
    post.user_id = req.tokenData._id;
    const user = await UserModel.findById(req.tokenData._id);
    user.posts.push(post._id);
    await user.save();
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.putPost = async (req, res) => {
  const validBody = validatePost(req.body);
  if (validBody.error) {
    return res.status(400).json({ err: validBody.error.details });
  }
  try {
    const id = req.params.id;
    let data;
    if (req.tokenData.role != "user") {
      data = await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    } else {
      data = await PostModel.findByIdAndUpdate(
        { _id: id, user_id: req.tokenData._id },
        req.body
      );
      console.log(req.body);
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    let data;
    if (req.tokenData.role != "user") {
      data = await PostModel.findByIdAndDelete({ _id: id });
    } else {
      data = await PostModel.findByIdAndDelete({
        _id: id,
        user_id: req.tokenData._id,
      });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.toggleFav = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ err: "post not found" });
    }
    let flag = true;
    const user = await UserModel.findById(req.tokenData._id);

    if (user.favorite.find((item) => item._id == id)) {
      flag = false;
      user.favorite = user.favorite.filter((item) => item._id != id);
    } else {
      flag = true;
      user.favorite.push(id);
    }
    await user.save();
    if (flag) {
      return res.json({ message: "Added To favorite" });
    } else {
      return res.json({ message: "remove from favorite" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

exports.getMyFavorite = async (req, res) =>{
  try{
    const postFav = (await UserModel.findById(req.tokenData._id).select('favorite').populate('favorite')).favorite
     res.json(postFav)
  }
  catch(err){
    console.log(err);
    res.status(500).json({err})
  }
}


