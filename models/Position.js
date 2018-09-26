const mongoose = require('mongoose')
//Создаем схему описывающую нашу модель
const Schema = mongoose.Schema

const positionSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    category:{
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.export = mongoose.model('positions', positionSchema)