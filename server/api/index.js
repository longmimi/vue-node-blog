const user = require('./user.js');
const article = require('./article.js');
const articlehome = require('./articlehome.js');
const articletags = require('./tags.js');
const articlecategory = require('./category.js');
const articletagsList = require('./tagsarticle.js');
const articlecategoryList = require('./categoryarticle.js')
const articletagsListByTagName = require('./tagarticlelistbytagname.js');
const articledetail = require('./getarticledetail.js');
const addvisitconut = require('./addvisit.js');
// const pagination = require('./pagination.js');

module.exports = (app) => {
    app.use(user);  //登录注册
    app.use(article); //操作文章
    app.use(articlehome); //首页获取文章 分页查询
    app.use(articletags); //首页获取文章标签
    app.use(articlecategory); //首页获取文章分类
    app.use(articletagsList); //首页标签相关文章查询
    app.use(articlecategoryList); //首页分类相关文章查询
    app.use(articletagsListByTagName); //标签相关文章展示页根据 tagName 查询  之前根据Id 分类也可用
    app.use(articledetail); //ID查询文章
    app.use(addvisitconut); //访问量+1
    // app.use(pagination); //分页查询
}