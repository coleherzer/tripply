const
    express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoDBURL = 'mongodb://localhost/tripply',
    ejsLayouts = require('express-ejs-layouts'),
    tripsRoutes = require('./routes/trips.js'),
    usersRoutes = require('./routes/users.js'),
    PORT = 3000,
    passport = require('passport'),
    flash = require('connect-flash'),
    passportConfig = require('./config/passport.js')

mongoose.connect(mongoDBURL, (err) => {
    console.log(err || 'Connected to MongoDB')
})

app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(ejsLayouts)
app.use(bodyParser.urlencoded())
app.use(flash())
app.use(express.static(`${__dirname}/public`))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    //res.render({message: "The root."})
    res.render('../views/home')
})

app.use('/trips', tripsRoutes)
app.use('/users', usersRoutes)


app.listen(PORT, (err) => {
    console.log(err || `Server connected on port ${PORT}`)
})