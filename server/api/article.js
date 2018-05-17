const express = require('express');
const ArticleSCM = require('../models/schema/article');
const router = express.Router();

const addArticle = (req,res) => {
    let userArticle = new ArticleSCM({
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        tags:req.body.tags,
        articleContent: req.body.articleContent,
        creatTime:req.body.creatTime,
        picUrl: req.body.picUrl,
        visit: 0,
        lastEditTime:req.body.creatTime
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

const deleteArticle = (req,res) => {
    console.log('删除文章');
    ArticleSCM.findByIdAndRemove(req.query.articleId).exec( (err,docs) => {
        if(err){
            console.log('删除出错',err)
            res.json({
                status:1,
                msg:'删除失败，请重试！'
            })
        }else{
            console.log('删除成功',docs)
            res.json({
                status:0,
                msg:'删除成功',
                result: docs
            })
        }
    })
}

const updateArticle = (req, res) => {
    console.log('更新文章');
    let updateInfo = {
        title:req.body.title,
        category:req.body.category,
        tags:req.body.tags,
        articleContent: req.body.articleContent,
        lastEditTime:req.body.creatTime,
        picUrl: req.body.picUrl,
        editId: req.body.editId
    }
    // console.log(updateInfo,'updateInfo----------------')
    ArticleSCM.findByIdAndUpdate(
        {
            _id:updateInfo.editId
        },
        {
            $set:{
                title: updateInfo.title,
                tags: updateInfo.tags,
                category:updateInfo.category,
                lastEditTime:updateInfo.lastEditTime,
                articleContent:updateInfo.articleContent,
                picUrl:updateInfo.picUrl
            }
        },
        {
            new:true
        }
    ).exec( (err,docs) => {
        if(err){
            console.log(err,'跟新数据的err------')
        }else{
            console.log(docs,'更新数据的docs--------');
             res.json({
                status:0,
                updateInfo:docs
            })
        }
    })
   
}
const submitComment = ( req,res) => {
    let updateInfo = {
        whoSubmit:req.body.whoSubmit,
        commentContent:req.body.commentContent,
        articleId:req.body.articleId,
        date:req.body.commentTime
    }
    console.log(updateInfo,'updateInfo----------------')
    ArticleSCM.findByIdAndUpdate(
        {
            _id:updateInfo.articleId
        },
        {
            $push:{
                comments: {
                    comment:updateInfo.commentContent,
                    whoSubmit:updateInfo.whoSubmit,
                    date:updateInfo.date
                }    
            }
        },
        {
            new:true
        }
    ).exec( (err,docs) => {
        if(err){
            console.log(err,'评论数据的err------')
        }else{
            console.log(docs,'评论数据的docs--------');
             res.json({
                status:0,
                commentInfo:docs
            })
        }
    })
}

router.post('/api/addArticle', addArticle)
router.get('/api/deleteArticle', deleteArticle)
router.post('/api/updateArticle', updateArticle)
router.post('/api/submitcomment', submitComment)
module.exports = router

