const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
module.exports.login = async function(req,res){
    //    Проверка существования пользователя
    const email = req.body.email
    const candidate = await Users.findOne({firstName: req.body.firstName, lastName: req.body.lastName,email: req.body.email})
    if (candidate)
    {
        //Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult){
            //Генерируем Token, пароли совпали
            const token = jwt.sign({
                firstName: candidate.firstName,
                lastName: candidate.lastName,
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else
        {
            //Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают. Проверьте правильность ввода пароля.'
            })
        }
    }
    else
    {
        //Пользователя нет - ошибка
        res.status(401).json({
            message: `Пользователь с таким email ${email} не существует.`
        })
    }

}

module.exports.register = async function(req,res){
    // //email & password
    // const user = new Users({
    //     email: req.body.email,
    //     password: req.body.password
    // })
    // user.save().then(() => console.log('User Created Success'))
    //    конструкция async await
    const email = req.body.email
    const candidate = await Users.findOne({email: req.body.email})
    if (candidate){
        //    Если пользователь существует - ошибка
        res.status(409).json({
            message: `Такой email ${email} уже существует.`
        })
    }else {
        //    Если пользователь не существует - создаем
        const salt =bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new Users ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            //сохраняем данные асинхронно
            await user.save()
            res.status(201).json(user)
        }
        catch (e) {
            // ловим ошибку
            errorHandler(res,e)
        }
    }
}