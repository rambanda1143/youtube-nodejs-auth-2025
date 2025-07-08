const express =require('express')

const authmiddleware=require('../middleware/auth-middleware')
const mongoose=require('mongoose')
const Image=require('../models/image')
const User =require('../models/User')
const router=express.Router()

router.get('/welcome', authmiddleware,async(req,res)=>{

    const {userId,username,role}=req.userInfo
    
    // const alluser=await User.find({})
    // console.log(alluser)
    console.log(username,role)
    res.json({
        message:"welcome to the home page",
        user_Id:userId,
        username,
        role

    })
})

module.exports=router