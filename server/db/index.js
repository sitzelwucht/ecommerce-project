const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/ecommerce'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(x => {console.log(`connected to database - "${x.connections[0].name}"`)})
.catch(err => console.log('Error while connecting to mongo: ', err))