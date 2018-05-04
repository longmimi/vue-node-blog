const user = require('./user.js');
const article = require('./article.js');
const articlehome = require('./articlehome.js');

module.exports = (app) => {
    app.use(user);
    app.use(article);
    app.use(articlehome);
}