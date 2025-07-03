const express = require('express')
const {addToCart,getCart,removeFromCart} = require('../controllers/cartController')
const authMiddleware = require('../middlewares/auth')

const cartRouter = express.Router()
cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.post('/get',authMiddleware,getCart)
cartRouter.delete('/remove',authMiddleware,removeFromCart)

module.exports = cartRouter