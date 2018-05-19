//  首页推荐文章的接口 暂时搁置
const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const ArticlePush = (req, res) => {
  let whatFind = {};
  ArticleSCM.find(whatFind).sort({'visit':-1}).limit(3).exec((err, docs) => {
    if (err) {
      console.log('err', err)
    } else {
      // console.log('推荐的docs', docs);
      res.json({
        status: 0,
        msg: '成功',
        pusharticle: docs
      })
    }
  })
}


router.get('/api/getpusharticle', ArticlePush);
module.exports = router
