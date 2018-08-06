var express = require("express");
var router = express.Router();
const AuthService = require("../services/authService");
var authService = new AuthService();

router.post("/",async(req,res,next)=>{
    try{
        //generate token from id password
        var token = await authService.signIn(req);
        res.status(200).json({token:token});
    }catch(err){
        res.status(err.status).json(err);
    }
});

router.post("/checkToken",async(req,res,next)=>{
    try {
        var decoded = await authService.verify(req);
        res.status(200).json(decoded);
    } catch (err) {
        res.status(err.status).json(err);
    }
});

module.exports = router;