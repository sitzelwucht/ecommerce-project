const express = require('express')
const router = express.Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v5: uuidv5 } = require('uuid')

const DOMAIN = 'http://localhost:3000/checkout'



// router.post('/create-checkout-session', async (req, res) => {

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Stubborn Attachments',
//               images: ['https://i.imgur.com/EHyR2nP.png'],
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${DOMAIN}?success=true`,
//       cancel_url: `${DOMAIN}?canceled=true`,
//     });
  
//     res.json({ id: session.id });
//   });
  



router.post('/payment', (req, res) => {
    const { product, token } = req.body
    const idempotencyKey = uuidv5()

    return stripe.customers.create({
      email: token.email,
      source: token.id
    }).then(customer => {
      stripe.charges.create({
        amount: product.price * 100,
        currency: 'eur',
        customer: customer.id, 
        receipt_email: token.email,
        description: `Purchase of ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country
          }
        }
      }, {idempotencyKey})
    })
    .then(result => res.status(200).json(results))
    .catch(err => res.status(500).json(err))
})


module.exports = router
