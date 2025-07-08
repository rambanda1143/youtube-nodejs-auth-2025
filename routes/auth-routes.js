const {registerUser,loginUser,changePassword}=require('../controllers/auth-controller')

const express=require('express')
const router= express.Router()

const authmiddleware=require('../middleware/auth-middleware')

router.post('/register',registerUser,()=>{
    console.log("register is running")
})
router.post('/login',loginUser)

router.post('/change-password',authmiddleware,changePassword)


module.exports = router