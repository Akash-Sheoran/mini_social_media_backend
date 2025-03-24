import Post from "../Models/post.model.js";

const create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.user = req.user_id;
    let data = new Post(req.body);
    await data.save();
    return res.status(200).json({ message: "post created succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

const update = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.query._id, req.body);
    return res.status(200).json({ message: "post updated succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

const remove = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.query._id);
    return res.status(200).json({ message: "post deleted succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

const get = async (req, res) => {
  try {
    let data = await Post.find();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

const get_by_user = async (req, res) => {
  try {
    let data = await Post.find({ user: req.user_id });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

export { create, update, remove, get, get_by_user };
