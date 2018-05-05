const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleTagsList = (req, res) => {
  let whatFind = {
    tags:{
      $regex: req.query.key, 
      $options: 'i'
    }
  },
      articleTags = ['tags'];
  ArticleSCM.find(whatFind, articleTags).exec((err, docs) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log('tags的docs', docs);
      res.json({
        status: 0,
        msg: '查询标签成功',
        articletagslist: docs
      })
    }
  })

}


router.get('/api/getarticletaglist', ArticleTagsList);
module.exports = router
