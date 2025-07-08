const express=require('express')
const authmiddleware = require('../middleware/auth-middleware')
const adminmiddleware = require('../middleware/admin-middleware')
const { uploadImageController, deleteImageController } = require('../controllers/image-controller')
const  uploadMiddleware =require('../middleware/imageupload-middleware')

const router=express.Router()

//upload the image

router.post('/upload',authmiddleware,adminmiddleware,uploadMiddleware.single("image"),uploadImageController,(req,res)=>{
    res.status(201).json({
        success:true,
        message:"uploaded successful"

    })

})

router.delete('/:id',authmiddleware,adminmiddleware,deleteImageController)

// to get all images


module.exports=router