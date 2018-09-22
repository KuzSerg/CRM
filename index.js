const app = require('./app')
//слушаем порт работы сервера
//либо через переменные окружения
//либо по умолчанию 5000
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server has been started on ${port}`))