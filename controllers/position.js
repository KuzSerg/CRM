const position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')


module.exports.getByCategoryId = async function(req,res){
    try{
        const positions = await position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json(positions)
    }
    catch (e){
        errorHandler(res, e)
    }
}

module.exports.create = async function(req,res){
    try{
    //    Создать новую позицию по определенным параметрам и сохранить ее
    //    Если "Ок" то отправить сообщение о том, что все "Ок" и отправить данные
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json(position)
    }
    catch (e){
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req,res){
    try{
        await position.remove({_id: req.params.id})
        res.status(200).json({
            message: "Позиция была удалена."
        })
    }
    catch (e){
        errorHandler(res, e)
    }
}

module.exports.update = async function(req,res){
    try{
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            //Обращаемся к ключу $set - для изменения данных внутри данного объекта
            //req.body - значения изменяемых данных
            {$set: req.body},
            //Нюансы Монгузе
            //Чтобы вернуть обновленную запись, а не ту, которая была до этого
            //добавляем новый объект с ключом new
            //данный параметр обновит данные в монгузе и после это вернет
            {new: true}
            )
        res.status(200).json(position)
    }
    catch (e){
        errorHandler(res, e)
    }
}