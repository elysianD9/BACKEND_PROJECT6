import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';


 cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

const uploadOnCloudinary =async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        //if file path is correct upload it on cloudinary 
         const response =  await cloudinary.uploader.upload(localFilePath, {
            resource_type : 'auto',
        })
        //file successfully uploaded on cloudinary 
        console.log("file uploaded", response.url); //response.url now this will be used in frontend
        return response;
    } catch (error) {
        fs.unlink(localFilePath);
        return null
    }
}