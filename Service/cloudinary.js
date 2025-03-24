import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const dummy_url = cloudinary.url("cld-sample-5", {
  transformation: [
    {
      fetch_format: "auto",
    },
    {
      quality: "auto",
    },
  ],
});

export const upload_img = async (file) => {
  try {
    if(!file) return null;

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(error);
      });

    fs.unlinkSync(file.path);  
    // console.log(uploadResult);
    return uploadResult;
    //console.log(dummy_url);
  } catch (error) {
    fs.unlinkSync(file);
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return null;
  }
};