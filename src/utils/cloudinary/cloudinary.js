import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME && !CLOUDINARY_API_KEY && !CLOUDINARY_API_SECRET) {
    throw new error("CLOUDINARY_CLOUD_NAME or CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET .env missing");
}

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(
            localFilePath, {
            resource_type: "auto",
        });
        //console.log(`File hase been uploaded successfully ${response.url}`);
        //console.log("Responce: ", response);
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Failed to upload files on Cloudinary");
        console.log(`\nError: ${error}`);
    }
}

export { uploadOnCloudinary };