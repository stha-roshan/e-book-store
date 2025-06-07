import dotenv from "dotenv";
dotenv.config();

import {v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (image) => {

    try {
        if(!image) return null
        const result = await cloudinary.uploader.upload(image)
        return result
    } catch (error) {
        console.log('something went wrong while uploading image', error.message)
        return null
    }
}

export { uploadOnCloudinary }