const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleTagsById = (req, res) => {
  let whatFind = {
    tags: {
      $regex: req.query.tagName,
      $options: 'i'
    }
  }
  ArticleSCM.find(whatFind).exec((err, docs) => {
    if (err) {
      console.log('按照_id这个条件查找的数据', err)
    } else {
      console.log('按照_id这个条件查找的数据', docs);
      res.json({
        status: 0,
        msg: '查询标签成功',
        articletagslistbyid: docs
      })
    }
  })
 
}


router.get('/api/getarticlelistbyid', ArticleTagsById);
module.exports = router
