const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express()

// load process.env.PORT from config.env
dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080

// log requests
app.use(morgan('tiny'))

//mongodb connection
connectDB()

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}))

// set view engine for [Every time you use res.render()]
// res.render() so that the HTML content must be handled by EJS as you have to set it. Allow is EJS.
app.set('view engine', 'ejs')

// set view engine for [res.render() in this directory]
// Express will look for templates in this directory when you use res.render() to render them. This is where Express will look for templates to use to render the page.
// app.set('view', path.resolve(__dirname, 'views/ejs'))

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

// app.get('/', (req, res) => {
//     // show message crud app on website
//     // res.send('crud app')

//     res.render('index')
// })

// app.get('/add_user', (req, res) => {
//     res.render('add_user')
// })

// app.get('/update_user', (req, res) => {
//     res.render('update_user')
// })

app.use('/', require('./server/routes/router'))
app.use('/add_user', require('./server/routes/router'))
app.use('/update_user', require('./server/routes/router'))

app.listen(PORT, ()=>{console.log(`server is running on http://localhost:${PORT}`) })