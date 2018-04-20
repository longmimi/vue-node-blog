var express = require('express');
const session = require('express-session')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const favicon = require('serve-favicon')
const index = require('./router/index') // localhost:3000/
// session机制的user
const user = require('./router/user')

// const db = mongoose.connect('mongodb://127.0.0.1:27017/test');

// db.connection('error',function(error){
//   console.log("数据库连接失败："+error);
// })
// db.connection("open",function(){
//   console.log("--------数据库连接成功------")
// });
mongoose.connect('mongodb://127.0.0.1:27017/myblog',function(err){
  if(err){
    console.warn('数据库连接失败：'+err);
}else {
    console.log('数据库成功连接到：');
}
})

mongoose.Promise = global.Promise

const port = process.env.PORT || 3000


// url请求解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// favicon
// app.use(favicon(__dirname + '/src/assets/favicon.ico'))

// 静态资源
app.use(express.static('dist'))

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

// 设定路由
app.use('/', index)
app.use('/api', user)
// app.use('/api/token', usertoken)

app.listen(port, () => {
  console.log('listen success')
})