// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY
// })
// const uploadonCloudinary = async (localFilepath) => {
//     try {
//         //upload the file on cloudinary
//         if (!localFilepath) return null
//         const response = await cloudinary.uploader.upload(localFilepath, {
//             resource_type: "auto"
//         })
//         //file has been uploaded successfully
//         console.log("File is uploade on Cloudinary", response.url)
//         return response

//     } catch (error) {
//         fs.unlinkSync(localFilepath) // Remove the locally saved temporary file as the upload operation got failed
//         return null
//     }
// }

// export {uploadonCloudinary}