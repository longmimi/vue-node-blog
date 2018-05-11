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
        type: Date
    },
    lastEditTime:{
        type:Date,
        default:Date.now()
    },
    articleContent:String,
    picUrl:{
        type:String,
        default:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525334463703&di=75babb628e78a4b363afde7cf1cf36da&imgtype=0&src=http%3A%2F%2Fimg.9ku.com%2Fgeshoutuji%2Fsingertuji%2F3%2F39125%2F39125_1.jpg'
    },
    comments:[{
        comment:{
            type:String,
            default:'暂无评论'
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }],
    visit:{
        type:Number,
        default: 0
    }
})

module.exports = mongoose.model('myarticleSCM',articleSchema)