const express = require('express');
const router = express.Router();
const User = require('../models/schema/user');
const ArticleSCM = require('../models/schema/article');
const sha1 = require('sha1');
const checkLogin = require('../middlewears/checkLogin').checkLogin
const checkNotLogin = require('../middlewears/checkLogin').checkNotLogin

// 注册
const Register = (req,res) => {
  let userRegister = new User({
    name:req.body.name,
    password:sha1(req.body.password),
    registertime:req.body.registertime
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
    password:sha1(req.body.password), //密码加密
    lastlogintime:req.body.lastlogintime
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
      if(userLogin.name == 'admin'){
        res.json({
          success:true,
          isAdmin:true,
          message:'欢迎您，管理员！',
          name:'admin'
        })
      }else{
          let name = req.body.name;
          let _lastlogintime = req.body.lastlogintime;
          User.update({name:name},{$set:{lastlogintime:_lastlogintime}})
          .exec((err,docs) => {
            if(err){
              console.log('update lastlogintime err',err)
            }else{
              console.log('success')
            }
          })
          // 用户信息写入session
          user.password = null;
          req.session.user = user;
          res.json({
            success:true,
            message:'登录成功',
            name:user.name
          })
      }
     
    }else{
      res.json({
        success:false,
        message:'密码错误'
      })
    }
  })
  .catch(err => res.json(err))
}

//后端查询所有用户信息
const backUserInfoAll = (req,res) => {
   let whatFind = {};
   User.find(whatFind)
   .exec((err,docs) => {
     if(err){
       console.log(err,'backUserInfoAll backUserInfoAll ')
     }else{
      // let authorTempArr = [];
      // docs.forEach( (item,index) => {
      //     authorTempArr.push(item.name)
      // })    
      var dataPromise = new Promise( (resolve,reject) => {
          let mydocs = [];
          for(let i = 0; i < docs.length;i++){
            let whatFindAuthor = {
              author:{
                $regex:docs[i].name
              }
            }
            ArticleSCM.find(whatFindAuthor).exec( (err,articlecountres) => {
            if(err){
              console.log(err,'articlecountres ======> err')
            }else{
              let tempObj = Object.assign({}, docs[i]);
            
              // console.log(docs[i],'docs[i]=======')       
                  
              
              tempObj._doc.pushCount = articlecountres.length;
              let _tempObj = tempObj._doc;
              // console.log(_tempObj,'_tempObj=================')
              mydocs.push(_tempObj);
            }
          })
        }
        setTimeout(() => {
          // console.log(mydocs,'mydocs==============')
           resolve(mydocs)
        }, 500);
         
      })
      
      
      
      //  console.log(docs,'backmange ArticleHomeAll');
      dataPromise.then( _mydocs => {
        // console.log(_mydocs,'_mydocs============')
         res.json({
         status:0,
         msg:'查询所有用户成功',
         userinfoall:_mydocs
       })  
      })
      
    }
   })

}




router.post('/api/register',checkNotLogin,Register)
router.post('/api/login',checkNotLogin,Login)
router.get('/api/getuserall',backUserInfoAll)

module.exports = router



