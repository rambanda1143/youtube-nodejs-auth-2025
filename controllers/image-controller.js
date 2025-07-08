const Image =require('../models/image')
const {uploadToCloudinary}=require('../helpers/cloudinaryHelper')
const {cloundinary}=require('../config/cloudinary')

const uploadImageController=async(req,res)=>{
    try {

        if(!req.file){
           return res.status(400).json({
            success:false,
            message:"file is required,please upload file "

        })
        }

        //upload  to cloudinary

        const {url,publicId}= await uploadToCloudinary(req.file.path)
        console.log(url)

        // store the image url and public id along with uploaded user id

        
        const newlyUploadedImage= new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        })

        await newlyUploadedImage.save()
        console.log(newlyUploadedImage)

        res.status(201).json({
            success:true,
            message:"Image uploaded successfully",
            image:newlyUploadedImage
        })
         
        
        
    } catch (error) {
        console.log("error in :",error)
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again"

        })
        
    }

}

const deleteImageController=async(req,res)=>{
    try {
         const getCurrentIdOfImageToBeDelete=req.params.id;
         const userId=req.userInfo.userId;

         const image=await Image.findById(getCurrentIdOfImageToBeDelete)
         if(!image){
            return res.status(500).json({
            success:false,
            message:"Image not found! try again"

        })



         }

         if(image.uploadedBy.toString()!==userId){
            return res.status(500).json({
                success:false,
                message:"You are not authorized person to delete image"
         }
        )
    }
    //delete this image first from your cloudinary storage

    await cloundinary.uploader.destroy(image.publiId)

    // delete this image from the mongodb database

    await image.findByIdAndDelete(getCurrentIdOfImageToBeDelete)
    res.status(200).json({
                success:true,
                message:"image deleted successfully"
         }
        )
    } catch (error) {
         console.log("error in :",error)
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again"

        })
        
    }
}

module.exports={uploadImageController,deleteImageController}