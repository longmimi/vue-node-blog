const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleCategoryList = (req, res) => {
  console.log('res.query.key',req.query.key)
  let whatFind = {
    'category':req.query.key
   
  };
  // articleTags = ['tags'];
  ArticleSCM.find(whatFind).exec((err, docs) => {
    if (err) {
      console.log('err', err)
    } else {
       console.log('getarticlecategorylist---的docs', docs);
      res.json({
        status: 0,
        msg: '查询标签成功',
        articlecategorylist: docs
      })
    }
  })

}


router.get('/api/getarticlecategorylist', ArticleCategoryList);
module.exports = router