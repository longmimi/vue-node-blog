const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleTags = (req,res) => {
   console.log('req',req);
   let whatFind = {},
       articleTags = ['tags'];
  ArticleSCM.find(whatFind, articleTags).exec((err,docs) => {
     if(err){
       console.log('err',err)
     }else{
       console.log('tags的docs',docs);
       res.json({
         status:0,
         msg:'查询标签成功',
         articletags:docs
       })  
    }
   })
  //去重查询tags
  //  ArticleSCM.distinct(whatFind, articleTags).exec((err,docs) => {
  //   if(err){
  //     console.log('err-distinct-tags',err)
  //   }else{
  //     console.log('去重tags的docs',docs)
  //     res.json({
  //       status:0,
  //       mas:'查询标签成功',
  //       articletags: docs
  //     })
  //   }
  // })
}


router.get('/api/getarticletags',ArticleTags);
module.exports = router
