var publicFn = require('./utilFn');

var urlInit = function() {
    var url = [{
        page: '/',
        router: require('../routes/index')
    }, {
        page: '/index',
        router: require('../routes/index')
    }, {
        page: '/about',
        router: require('../routes/about')
    }, {
        page: '/account',
        router: require('../routes/account')
    }, {
        page: '/login',
        router: require('../routes/login')
    }, {
        page: '/register',
        router: require('../routes/register')
    }, {
        page: '/blog',
        router: require('../routes/blog')
    }, {
        page: '/personcenter',
        router: require('../routes/personcenter')
    }, {
        page: '/personblog',
        router: require('../routes/personblog')
    }];
    for (var i = 0; i <= url.length - 1; i++) {
        console.log(url[i].page)
        publicFn.urlInit(url[i].page, url[i].router);

    };

};
module.exports = urlInit;