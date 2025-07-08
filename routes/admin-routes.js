const express=require('express')
const authmiddleware = require('../middleware/auth-middleware')
// const { route } = require('./auth-routes')
const router=express.Router()

const adminmiddleware =require('../middleware/admin-middleware')

router.get('/welcome',authmiddleware,adminmiddleware,(req,res)=>{
   
    res.status(201).json({
        success:true,
        message:"Welcome to the Admin Welcome Page"
    })

})



module.exports=router