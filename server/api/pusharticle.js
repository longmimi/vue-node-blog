const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticlePush = (req, res) => {
  console.log('req', req);
  let whatFind = {},
      articleTags = ['tags'];
  ArticleSCM.find(whatFind, articleTags).limit(3).exec((err, docs) => {
    if (err) {
      console.log('err', err)
    } else {
      // console.log('推荐的docs', docs);
      res.json({
        status: 0,
        msg: '成功',
        articletags: docs
      })
    }
  })
}


router.get('/api/getarticletags', ArticlePush);
module.exports = router
