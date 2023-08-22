const {
  UserModel,
  validateLogin,
  createToken,
  validateUser,
} = require("../../model/userModel");
const bcrypt = require("bcrypt");


exports.getAllUsers = async (req, res) => {
  const data = await UserModel.find({});
  res.json(data);
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findOne(
      { _id: req.tokenData._id },{ password: 0 ,__v:0, updatedAt:0}).populate("posts");
    res.json({user});
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.getUsersList = async (req, res) => {
  try {
    const data = await UserModel.find({}, { password: 0 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.signUpUsers = async (req, res) => {
  const validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }

  try {
    const user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "*****";
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res
        .status(401)
        .json({ err: "Email already in system", code: 11000 });
    }
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.loginUser = async (req, res) => {
  const validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ err: "Email or password wrong!" });
    }
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(401).json({ err: "Email or password wrong!" });
    }
    const token = createToken(user._id, user.role);
    res.json({ token, role: user.role });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};


exports.updateProfileImage = async (req, res) => {
  try {
    const { profileImage } = req.body;

    if (!profileImage) {
      return res.status(400).json({ error: 'Missing profileImage data' });
    }

    const data = await UserModel.updateOne(
      { _id: req.tokenData._id },
      { profileImage }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ error: 'An error occurred while updating the profile image' });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == req.tokenData._id) {
      return res.status(401).json({ err: "you cant delete your self" });
    }
    const data = await UserModel.deleteOne({
      _id: id,
      role: { $not: new RegExp("superadmin") },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

exports.changeRoleUser = async (req, res) => {
  try {
    const { id, role } = req.params;
    if (role !== "user" && role !== "admin") {
      return res.status(401).json({ err: "You can send admin or user role" });
    }
    if (id === req.tokenData._id) {
      return res.status(401).json({ err: "You can't change your own role" });
    }
    const data = await UserModel.updateOne(
      { _id: id, role: { $not: new RegExp("superadmin") } },
      { role }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};



