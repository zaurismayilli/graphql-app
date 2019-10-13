const userResolver      = require('./user')
const blogResolver      = require('./blog');
const catResolver       = require('./category');
const aboutResolver     = require('./about')
const serviceResolver   = require('./service')
const subsResolver      = require('./subscribe');
const contactResolver   =require('./contact');

module.exports = {
    ...userResolver,
    ...blogResolver,
    ...catResolver,
    ...aboutResolver,
    ...serviceResolver,
    ...subsResolver,
    ...contactResolver
}