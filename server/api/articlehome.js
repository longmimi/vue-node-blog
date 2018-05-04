const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleHome = (req, res) => {
    console.log('req',req);
    let articleList = {};
    ArticleSCM.find({}).sort({'creatTime':-1}).exec( (err,docs) => {
      if(err){
        console.log('查询出错',err)
      }else{
        console.log('查询的docs',docs)
        res.json({
          status: 0,
          msg:'成功',
          articlehome: docs
        })
      }
    })
    
}

router.get('/api/getarticlehome', ArticleHome)

module.exports = router

