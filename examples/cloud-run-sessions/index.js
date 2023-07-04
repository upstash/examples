var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
const redis = require('redis')

var RedisStore = require('connect-redis')(session)
var client = redis.createClient ({
  // REPLACE HERE
});

var app = express()

app.use(session({
    store: new RedisStore({ client: client }),
    secret: 'forest cat',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    next()
})

app.get('/', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/'] + ' times')
})


app.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(8080, function () {
    console.log('The app listening on port 8080!');
});
