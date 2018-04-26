const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const articleSchema = new Schema({
    title:String,
    author:String,
    tags:[
        {
            type: String,
            ref:'tags'
        }
    ],
    category: {
        type: String,
        ref: 'Category' //关联Category表的_id
    },
    creatTime:{
        type:Date
    },
    lastEditTime:{
        type:Date,
        default:Date.now
    },
    contentHtml:String,
    comtentMd:String,
    comments:[{
        comment:{
            type:String,
            default:'暂无评论'
        },
        date:{
            type:Date,
            default:Date.now
        }
    }]
})

module.exports = mongoose.model('myarticleSCM',articleSchema)