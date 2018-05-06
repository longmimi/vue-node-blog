const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const Article = (req,res) => {
    let userArticle = new ArticleSCM({
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        tags:req.body.tags,
        articleContent: req.body.articleContent,
        creatTime:req.body.creatTime,
        picUrl: req.body.picUrl
    })
    console.log(req.body)
    userArticle.save((err,article) => {
        console.log('存储文章');
        if(err){
            console.log(err,'存储错误-----错误信息')
             res.json({
                status: 1,
                msg:'发布失败'
            })
        }else{
            // console.log(article,'存储成功-----成功信息')
            res.json({
                status: 0,
                msg:'恭喜发布成功！',
                articleId: article._id
            })
        }
    })
}

router.post('/api/addArticle', Article)
module.exports = router

