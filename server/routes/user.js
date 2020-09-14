const express=require('express');
const {User} =require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport')
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const router =express.Router(); 

router.get('/',async (req,res,next)=>{
   try{
       if(req.user){
            const user = await User.findOne({
                where:{id:req.user.id},
                attributes:['nickname'] 
            })
            res.status(200).json(user);
       }else{
            res.status(200).json(null);
       }
   }catch(error){
        console.error(error);
        next(error);
   }
});

router.post('/login',isNotLoggedIn,(req,res,next) => {
    passport.authenticate('local',(err,user,info)=>{
        if (err){
            console.error(err);
            next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user,async(loginErr)=>{
            if(loginErr){
                return next(loginErr);
            }
            const nickname = await User.findOne({
                where:{id:user.id},
                attributes:['nickname'] 
            })
            return res.status(200).json(nickname);
        })
    })(req,res,next);
});

router.post('/create',isNotLoggedIn,async(req,res,next) => {
    try{
        const exUser = await User.findOne({
            where:{
                email:req.body.email,
            }
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword=await bcrypt.hash(req.body.password,12);
        await User.create({
            userid:req.body.userid,
            password:hashedPassword,
            nickname:req.body.nickname,
            email:req.body.email
        });
        res.status(200).send('ok');
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.post('/logout',isLoggedIn,(req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.send('ok'); 
})

module.exports=router;