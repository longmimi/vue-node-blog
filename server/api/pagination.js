const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const pagination = (req,res) => {
   let whatFind = {},
       page = req.query.pageNumber;
   ArticleSCM.find(whatFind)
   .skip((page-1)*5)
   .limit(5)
   .sort({'creatTime':-1})
   .exec((err,docs) => {
     if(err){
       console.log(err,'分页的err')
     }else{
       console.log(docs,'分页的docs');
       res.json({
         status:0,
         msg:'查询标签成功',
         pagination:docs
       })  
    }
   })

}


router.get('/api/getpagination',pagination);
module.exports = router