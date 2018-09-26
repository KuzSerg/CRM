const mongoose = require('mongoose');
//Создаем схему описывающую нашу модель
const Schema = mongoose.Schema;

//Присваиваем переменной categorySchema отвечающая за схему,
//сюда передаем объект конфигурации
const categorySchema = new Schema({
	//Создаем новый ключ
	name: {
		//У каждого ключа есть тип - указываем его
		type: String,
		//Указывает на модификатор - поле обязательное
		required: true,
	},
	imageSrc: {
		//У каждого ключа есть тип - указываем его
		type: String,
		//Указывает на модификатор - поле необязательно
		default: '',
	},
	user: {
		//Создаем ссылку на указывающую коллекцию
		ref: 'users',
		//Указываем для коллекции тип - Schema.Types.ObjectId
		type: Schema.Types.ObjectId,
	},
});

//Экспорт модели:
//Создаем нужную нам таблицу/коллекцию и передаем в нее созданную схему
module.exports = mongoose.model('categories', categorySchema);
