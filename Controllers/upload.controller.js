import { upload_img } from "../Service/cloudinary.js";

const upload_file = async (req, res) => {
  try {
    let file = req.file;
    let result = await upload_img(file);
    return res.status(200).json({ message: "uploaded" , result});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error?.message });
  }
};

export { upload_file };