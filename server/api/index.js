const user = require('./user.js');
const article = require('./article.js');

module.exports = (app) => {
    app.use(user);
    app.use(article);
}