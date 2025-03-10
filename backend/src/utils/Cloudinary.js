import { v2 as Cloudinary } from "cloudinary"
import fs from "fs"


Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_APIKEY,
    api_secret: process.env.CLOUDINARY_CLOUD_APISECRET
})


const UploadFile = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await Cloudinary.uploader.upload(
            localFilePath, {
                resource_type:"auto"
            }
            
        )
        console.log(response.url);
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("Local file deleted:", localFilePath);
            }
        });
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { console.log(result); });


export { UploadFile }