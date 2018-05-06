const user = require('./user.js');
const article = require('./article.js');
const articlehome = require('./articlehome.js');
const articletags = require('./tags.js');
const articlecategory = require('./category.js');
const articletagsList = require('./tagsarticle.js');
const articletagsListById = require('./tagarticlelistbyid.js');
const articledetail = require('./getarticledetail.js');

module.exports = (app) => {
    app.use(user);  //登录注册
    app.use(article); //新建文章
    app.use(articlehome); //首页获取文章
    app.use(articletags); //首页获取文章标签
    app.use(articlecategory); //首页获取文章分类
    app.use(articletagsList); //首页标签相关文章查询
    app.use(articletagsListById); //首页标签相关文章根据 tagName 查询  之前根据ID
    app.use(articledetail); //ID查询文章
}