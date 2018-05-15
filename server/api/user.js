const express = require('express');
const router = express.Router();
const User = require('../models/schema/user');
const sha1 = require('sha1');
const checkLogin = require('../middlewears/checkLogin').checkLogin
const checkNotLogin = require('../middlewears/checkLogin').checkNotLogin

// 注册
const Register = (req,res) => {
  let userRegister = new User({
    name:req.body.name,
    password:sha1(req.body.password) //密码加密
  })

  User.findOne({
    name:(userRegister.name).toLowerCase()
  })
  .then(user => {
    // console.log(user,'user')
    if(user){
      res.json({
        status:1,
        msg:'该账户已注册！'
      })
    }else{
      userRegister.save((err,user) => {
        // console.log('这里存储用户注册信息')
        if(err){
          console.log(err,'错误信息')
          res.json({
            status:1,
            msg:'注册失败，请重试'
          })
        }else{
          // console.log(user,'用户user')
          res.json({
            status:0,
            msg:'恭喜注册成功！'
          })
        }
      })
    }
  })
  .catch(err => res.json(err))
}

// 登录
const Login = (req,res) => {
  // console.log('req.session:'+req.session)
  let userLogin = new User({
    name:req.body.name,
    password:sha1(req.body.password) //密码加密
  })

  User.findOne({
    name:(userLogin.name).toLowerCase()
  })
  .then(user => {
    // console.log(user,'user登录')
    if(!user){
      res.json({
        success:false,
        message:'账号不存在'
      })
    }else if(userLogin.password === user.password){
      var name = req.body.name;
      // 用户信息写入session
      user.password = null;
      req.session.user = user;
      res.json({
        success:true,
        message:'登录成功',
        name:user.name
      })
    }else{
      res.json({
        success:false,
        message:'密码错误'
      })
    }
  })
  .catch(err => res.json(err))
}

router.post('/api/register',checkNotLogin,Register)
router.post('/api/login',checkNotLogin,Login)

module.exports = router



