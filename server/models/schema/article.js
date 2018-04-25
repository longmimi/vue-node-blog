const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const articleSchema = new Schema({
    title:String,
    author:String,
    visit:{
        type:Number,
        default:0
    },
    tags:[
        {
            type: ObjectId,
            ref:'tags'
        }
    ],
    category: {
        type: ObjectId,
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
        comment:String,
        date:Date
    }]


})