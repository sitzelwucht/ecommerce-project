require('dotenv/config')
require('./db')

const express = require('express')
const app = express()

require('./config')(app)

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

// app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));


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