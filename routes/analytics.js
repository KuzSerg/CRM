const express = require ('express')
const controller = require('../controllers/analytics')
const router = express.Router()
//Полный URL - localhost:5000/api/auth/login
router.get('/overview', controller.overview)
//Полный URL - localhost:5000/api/auth/register
router.get('/analytics', controller.analytics)



module.exports = router