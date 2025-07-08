const mongoose= require('mongoose')
require('dotenv').config()
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log('Database connected successfully')
        
    }catch(e){
        console.log("MongoDB connection Failed"),
        process.exit(1)
    }
}
module.exports= connectDb