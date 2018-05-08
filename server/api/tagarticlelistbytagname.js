const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticleTagsByTagName = (req, res) => {
  let whatFind = {
    tags: {
      $regex: req.query.tagName,
      $options: 'i'
    }
  }
  ArticleSCM.find(whatFind).exec((err, docs) => {
    if (err) {
      console.log('按照 tagname 这个条件查找的数据', err)
    } else {
      console.log('按照 tagname 这个条件查找的数据', docs);
      res.json({
        status: 0,
        msg: '查询 --api/getarticlelistbytagname--成功',
        articletagslistbytagname: docs
      })
    }
  })
}

const ArticleTagsByCategoryName = (req, res) => {
  let whatFind = {
    category: req.query.cateName
  }
  ArticleSCM.find(whatFind).exec((err, docs) => {
    if (err) {
      console.log('按照 catename 这个条件查找的数据', err)
    } else {
      console.log('按照 catename 这个条件查找的数据', docs);
      res.json({
        status: 0,
        msg: '查询 --api/getarticlelistbycatename--成功',
        articletagslistbycatename: docs
      })
    }
  })
}


router.get('/api/getarticlelistbytagname', ArticleTagsByTagName);
router.get('/api/getarticlelistbycategoryname', ArticleTagsByCategoryName);
module.exports = router
