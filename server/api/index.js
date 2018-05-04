const user = require('./user.js');
const article = require('./article.js');
const articlehome = require('./articlehome.js');
const articletags = require('./tags.js');
const articlecategory = require('./category.js');

module.exports = (app) => {
    app.use(user);
    app.use(article);
    app.use(articlehome);
    app.use(articletags);
    app.use(articlecategory);
}