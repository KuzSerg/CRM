const mongoose = require('mongoose')
//Создаем схему описывающую нашу модель
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        //Проверка пользователя на наличие его Email в СУБД
        unique: true,
    },
    password:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('User', userSchema)