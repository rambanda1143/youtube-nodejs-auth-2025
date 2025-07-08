require('dotenv').config()
 
const express = require('express')
const connectDb=require('./database/db');
const app=express()
const authRoutes=require('./routes/auth-routes')
const homeRoutes=require('./routes/home-routes')
const uploadImageRoutes =require('./routes/image-routes')
const adminRoutes=require('./routes/admin-routes')
const changePassword=require('./routes/auth-routes');
const authmiddleware = require('./middleware/auth-middleware');
connectDb()

PORT=process.env.PORT  || 3000

app.use(express.json())
app.use('/api/auth',authRoutes)

app.use('/api/auth',homeRoutes)
app.use('/api/auth/admin',adminRoutes)

app.use('/api/auth/image',uploadImageRoutes)
app.use('/api/auth',authmiddleware,changePassword)


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

