var express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./api/index.js')
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/myblog',function(err){
  if(err){
    console.warn('数据库连接失败：'+err);
  }else {
    console.log('数据库成功连接!');
  }
})

mongoose.Promise = global.Promise

const port = process.env.PORT || 3000


// url请求解析
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     parameterLimit: 100000,
//     limit: '50mb',
//     extended: true
// }))


// 此处解决post传输图片尺寸过大的问题
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// session
app.use(session({
  secret: 'usersession',
  key: 'usersession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000 // 设置返回的cookie时效为30秒，测试用
  }
  // store: new MongoStore({
  //   url: "mongodb://localhost:27017/usersession"
  // })
}))


// 静态资源
app.use(express.static('dist'))


// 设定路由
route(app);

app.listen(port, () => {
  console.log('listen success')
})