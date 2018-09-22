const mongoose = require('mongoose')
//Создаем схему описывающую нашу модель
const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
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