import {v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
    cloud_name: 'doriurxyu', 
    api_key: '656477812168668', 
    api_secret: '0a43PRk2EYDG1h_vrlLluFKwKsU'
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