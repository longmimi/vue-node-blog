const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleCategory = (req, res) => {
  console.log('req', req);
  let whatFind = {},
      ArticleCategory = ['category']
  ArticleSCM.find(whatFind, ArticleCategory).exec((err, docs) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log('分类的docs', docs);
      res.json({
        status: 0,
        msg: '查询分类成功',
        articlecategory: docs
      })
    }
  })
}


router.get('/api/getarticlecategory', ArticleCategory);
module.exports = router