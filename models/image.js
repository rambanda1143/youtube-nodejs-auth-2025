const mongoose=require('mongoose')


const imageSchema= new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    publiId:{
        type:String,
        required:true
    },
    uploadedBy:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        
    }

},{timestamps:true})

module.exports=mongoose.model('Image',imageSchema)