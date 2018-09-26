const mongoose = require('mongoose')
//Создаем схему описывающую нашу модель
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date:{
        type: Date,
        default: Date.now
    },
    order:{
        type: Number,
        required: true
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    //Создаем массив данных list
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],

})

module.export = mongoose.model('orders', orderSchema)