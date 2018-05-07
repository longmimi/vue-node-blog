const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const AddVisit = (req, res) => {
  let whatFind = {
     _id: req.query.articleId
  }
  //访问量+1
    //方法1
        //   ArticleSCM.find(whatFind).exec((err,docs) => {  
        //       if(err){
        //           console.log('err',err)
        //       }else{
        //         let visitTemp = docs[0].visit; 
        //         let updates = {
        //             visit:visitTemp + 1
        //         }    
        //         ArticleSCM.update(whatFind,updates).exec( (err,resvisit) => {
        //             console.log('res 返回的数据',resvisit)
        //             res.json({
        //                 status:0,
        //                 visit:visitTemp
        //             })

        //         })
        //       }
            
        //   })
    //方法2
  ArticleSCM.update(whatFind,{ $inc:{visit:1}},{ multi: true }).exec((err, docs) => {
    if (err) {
      console.log('按照_id这个条件查找失败', err)
      res.json({
          status:1,
          msg:'查找文章失败'
      })
    } else {
      console.log('按照_id这个条件查找的数据', docs);
      res.json({
          status:0,
          msg:'访客+1成功',
          visitcount: docs
      })
    }
  })
}

router.get('/api/addvisit', AddVisit);
module.exports = router