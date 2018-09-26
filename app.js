//Подключаем плагины и модули
const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes =  require('./routes/auth')
const analyticsRoutes =  require('./routes/analytics')
const categoryRoutes =  require('./routes/category')
const orderRoutes =  require('./routes/order')
const positionRoutes =  require('./routes/position')
const app = express()
const keys = require('./config/keys')

//Коннект к СУБД MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.log(e))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan = require ('morgan')('dev'))
//Обращаемся к объекту app
//Вызов плагина bodyParser с методом JSON
// для генерации из JSON -> JS объекты
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json())

//Обращаемся к объекту app
//Вызов плагина bodyParser с методом urlencoded и параметром
app.use(bodyParser.urlencoded({extended: true}))
app.use(require ('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
module.exports = app