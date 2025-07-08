 const jwt= require('jsonwebtoken')
 
 function authmiddleware(req,res,next){

    const authHeader= req.headers["authorization"]
    
    const token= authHeader && authHeader.split(' ')[1]
    
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Token is Empty , give another Token"

        })

    }

    try{
        const decodeToken= jwt.verify(token,process.env.JWT_SECREATE_KEY)

        req.userInfo=decodeToken
        console.log('successfully decoded')
        next()

    }catch(e){
        console.log(e),
        res.status(500).json({
            
            successs:false,
            message:"Access Denied Token Is Not Valid"
        })
    }
















//     const  authHeader=req.headers['authorization']
//     // console.log(authHeader)

//     const token= authHeader && authHeader.split(" ")[1]

//     if(!token){
//         return res.status(401).json({
//             success:false,
//             message:"The token was not correct or Not Given ,Access Denied"
//         })
//     }
// //    console.log("token is :",token)
// try{
//     const decodeToken=  jwt.verify(token,JWT_SECREATE_KEY)
//     console.log(decodeToken);
    
//     req.userInfo=decodeToken
//      next()

// }catch(e){
//     console.log(e),
//     res.status(500).json({
//         success:false,
//         message:"Access Denied Becouse used wrong Token"
//     })

// }
    // const decodeToken= jwt.verify(token,process.env.JWT_SECREATE_KEY)
    // console.log(decodeToken)



   
    
}
module.exports = authmiddleware