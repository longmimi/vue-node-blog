const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleHome = (req, res) => {
    // console.log('req',req);
    let articleList = {};
    ArticleSCM.find({}).sort({'creatTime':-1})
    .limit(5)
    .exec( (err,docs) => {
      if(err){
        console.log('查询出错',err)
      }else{
        // console.log('查询的docs',docs)
          ArticleSCM.count({}, function(err, total){
          if (err) {
              console.log("Error:" + err);
          }
          else {
              res.json({
                status: 0,
                msg:'成功',
                totalNumber:total,
                articlehome: docs
              })
          }
        })    
      }
    })
}

const ArticleHomeAll = (req,res) => {
   let whatFind = {}
   ArticleSCM.find(whatFind)
   .sort({'creatTime':-1})
   .exec((err,docs) => {
     if(err){
       console.log(err,'backmange ArticleHomeAll ')
     }else{
      //  console.log(docs,'backmange ArticleHomeAll');
       res.json({
         status:0,
         msg:'查询标签成功',
         articlehomeall:docs
       })  
    }
   })

}

const pagination = (req,res) => {
   let whatFind = {},
       page = req.query.pageNumber;
   ArticleSCM.find(whatFind)
   .skip((page-1)*5)
   .limit(5)
   .sort({'creatTime':-1})
   .exec((err,docs) => {
     if(err){
       console.log(err,'分页的err')
     }else{
       console.log(docs,'分页的docs');
       res.json({
         status:0,
         msg:'查询标签成功',
         pagination:docs
       })  
    }
   })

}

router.get('/api/getarticlehome', ArticleHome);
router.get('/api/getpagination',pagination);
router.get('/api/getarticlehomeall',ArticleHomeAll);

module.exports = router

