var express=require('express')
var router=express.Router()
var regUser = require ('../Services/authService')


router.post('/login',async function(req,res,next){
    try{
        var data = req.body.data
        var result = await regUser.loginUser(data)
        res.json(result)
    } catch(e){
        if(e.message === 'wrong email, password || User Not Registered'){
            res.status(400).json({e:e.message})
        } else{
            res.status(500).json({e: 'Internal Server Error'})
        }
    }
})

router.post('/register-user',async function(req, res, next){
    try{
        var data = req.body.data
        var result = await regUser.registerUser(data)
        res.json(result)
    } catch(error){
        if (error.message === "User Already Exists") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
})

module.exports=router;