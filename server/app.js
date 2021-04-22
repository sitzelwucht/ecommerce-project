require('dotenv/config')
require('./db')

const express = require('express')
const app = express()

require('./config')(app)

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(session({
    secret: 'someSecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*60*24
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/ecommerce",
        ttl: 60*60*24
    })
}))

const allRoutes = require('./routes')
app.use('/api', allRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes)

const productRoutes = require('./routes/product.routes')
app.use('/api', productRoutes)

app.use((req, res, next) => {
    res.sendFile(__dirname + '/public.index.html')
})

module.exports = app