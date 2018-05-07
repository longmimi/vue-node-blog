const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const getArticleDetail = (req,res) => {
  ArticleSCM.findById(req.query.articleId).exec( (err,docs) => {
    if(err){
      console.log('err',err)
    }else{
      console.log('getArticleDetail的docs', docs);
      res.json({
        status: 0,
        msg: '查询文章成功',
        articledetail: docs
      })  
    }
  })
}


router.get('/api/getArticleDetail',getArticleDetail)
module.exports = router