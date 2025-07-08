const cloudinary=require('../config/cloudinary')


async  function uploadToCloudinary(filePath){
    try{
        const result= await cloudinary.uploader.upload(filePath)
        return{
            url:result.secure_url,
            publicId:result.public_id
        }


    }catch(e){
        console.log("Error while uploading to cloudinary",e);
        throw new e("Error while uploading to cloudinary")
    }
}

module.exports ={uploadToCloudinary}