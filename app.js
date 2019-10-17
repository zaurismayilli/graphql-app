const express = require('express');

const mongoose = require('mongoose')

const isAuth = require('./middleware/is-auth')

const app = express();

const schema = require('./graphql/schema/schema')
const rootValue = require('./graphql/resolver/index')

const grapHttp = require('express-graphql');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next();
});

app.use(isAuth);

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true})
.then(con => {
    app.listen(3003);
})
.catch(err => {
    throw err;
});

app.use('/graphql', grapHttp({
    schema,
    rootValue,
    graphiql: true
}));