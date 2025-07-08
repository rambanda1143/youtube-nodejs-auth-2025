const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const User=require('../models/User')
const jwt=require('jsonwebtoken')
const authmiddleware = require('../middleware/auth-middleware')

const registerUser=async (req,res)=>{
    try{

        const {username,email,password,role}=req.body;
        const verifyUser= await User.findOne({
            $or:[{username}, {email}]
        }

        
        )
        if(verifyUser){
            res.status(400).json({
                success:false,
                message:"Unable create user ,already exists either same password or email"
            })
            
        }
        
        const salt= await bcrypt.genSalt(10)
        const hashedPassord=await bcrypt.hash(password,salt)

        const newlyCreatedUser= await User({
            username,
            email,
            password:hashedPassord,
            role:role || 'user'
        })
        await newlyCreatedUser.save()

        console.log(newlyCreatedUser)
        res.status(200).json({
            success:true,
            message:"register successfully"
        })



    }catch(e){
        console.log("error occured:",e)
        res.status(500).json({
            success:false,
            message:"Unable to Register",
        })
    }
}

// const registerUser=async(req,res)=>{
//     try{
//         const {username,email,password,role}=req.body;
//         const checkRegister= await User.findOne({
//             $or:[{username},{email}],
      
//         });

        
//         if(checkRegister){
//             res.status(400).json({
//                 success:false,
//                 message:
//                 "User already exists or either with same username or email"
//             })
            
//         }
        
//         const salt=await bcrypt.genSalt(10)
//         const hashPassword=await bcrypt.hash(password,salt)
         

//         const newlyCreatedUser=new User({
//             username,
//             email,
//             password:hashPassword,
//             role:role ||'user'
//         })

//         await newlyCreatedUser.save()

//         if(newlyCreatedUser){
//             res.status(201).json({
//                 success:true,
//                 message:"New User created",
//                 data:newlyCreatedUser
//             })
//             console.log(newlyCreatedUser)


//         }
//         else{
//             res.status(400).json({
//                 success:false,
//                 message:"unable to register user",
                
//             })
//         }
//     }catch(e){
//         console.log("Error is :",e)
//         res.status(500).json({
//             success:false,
//             message:"Error is occured!"
//         })
//     }
// }




const loginUser=async(req,res)=>{
    
    try{

        const {username,password}=req.body;
       
        const user=await User.findOne({username});
        if(!user){
            res.status(400).json({
                success:false,
                message:'user not exists',
            })

        }

        const passwordCompare= await bcrypt.compare(password,user.password)

        if(!passwordCompare){
            res.status(400).json({
                success:false,
                message:"Entered password is not correct please give another password",

            })
        }
        

        const accessToken=  jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role,
        },process.env.JWT_SECREATE_KEY,{expiresIn:'15m'}
    )

        res.status(201).json({
            success:true,
            message:"Login Successfully",
           
            accessToken
            
        })


    }catch(e){
        console.log(e),
        res.status(400).json({
            success:false,
            message:"Not able to login "
        })
    }

    
    // try{
    //     const {username,password}=req.body
        
    //     const user= await User.findOne({username})
    //     if(!user){
    //         return res.status(400).json({
    //             success:false,
    //             message:"Incorrect username"
    //         })
    //     }

        
        
    //     const isPasswordMatch= await bcrypt.compare(password,user.password)

    //     if(!isPasswordMatch){
    //         return res.status(400).json({
    //             success:false,
    //             message:"Incorrect  password"
    //         })
            
    //     }

           
       
    // //create user token 
    
    // const accessToken=jwt.sign({
    //     userId:user._id,
    //     username:user.username,
    //     role:user.role,

    // },process.env.JWT_SECREATE_KEY,{expiresIn:'15m'})

    
    //  res.status(200).json({
    //             success:true,
    //             message:"Login successfully",
    //             accessToken
    //         })
    //     console.log(accessToken)

    // }catch(e){
    //     console.log("Error is :",e)
    //     res.status(500).json({
    //         success:false,
    //         message:"Error is occured!"
    //     })

    // }
}


// const changePassword=async(req,res)=>{
//     try{
//         const userId=req.userInfo.userId

//         const user =await User.findById({_id:userId})

//         if(!user){
//             return res.status(400).json({
//             success:false,
//             message:"User not exists"
//         })
//         }

//         const {oldPassword,newPassword}=req.body

//         const verifyOldPassword= await bcrypt.compare(oldPassword,user.userId)

//         if(verifyOldPassword){
//             return res.status(400).json({
//             success:false,
//             message:"Old Password is not correct"
//         })

//         }

//         const salt=await bcrypt.genSalt(10)
//         const newHashedPassord=await bcrypt.hash(newPassword,salt)

//         user.password=newHashedPassord
//         await user.save()

//          res.status(200).json({
//             success:true,
//             message:"password changed successfully"
//         })


        
//     } catch (error) {
//         console.log(error),
//         res.status(400).json({
//             success:false,
//             message:"not able to change the password"
//         })
        
//     }
// }


const changePassword=async(req,res)=>{
    try{

        const userId=req.userInfo.userId

        //extract nre and old password

        const {oldPassword,newPassword}=req.body

        //find the current logged in user

        const user=await User.findById({_id:userId})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        // check if the old password is correct

        const isPasswordMatch= await bcrypt.compare(oldPassword,user.password)
        if(!isPasswordMatch){
            return  res.status(400).json({
                success:false,
                message:'old password is not correct'
            })
            
        }

        const salt= await bcrypt.genSalt(10)
        const newHashedPassord= await bcrypt.hash(newPassword,salt)

         user.password=newHashedPassord

        await user.save();

         res.status(200).json({
                success:true,
                message:'password changed successfully'
            })


    }catch(e){
        console.log(e),
        res.status(400).json({
            success:false,
            message:"Not able to login "
        })
    }

}

module.exports={loginUser,registerUser,changePassword}