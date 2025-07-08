function adminmiddleware(req,res,next){

    
    if(req.userInfo.role != "admin"){
        return res.status(403).json({
            success:false,
            message:"Access denied! Admin rights required"
        })

    }
    console.log(req.userInfo.role)
        
   
        
    
next()

}

module.exports=adminmiddleware