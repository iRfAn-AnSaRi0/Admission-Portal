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
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}



export { UploadFile }