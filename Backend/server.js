const express = require('express')
const app=express()
const connectDB = require('./config/dbConfig')

const port = process.env.PORT || 4000;

//midlewares
app.use(express.json())
const cors=require('cors')
app.use(cors())
require('dotenv').config()
app.use("/image",express.static('uploads'))
connectDB()

//routes
app.use('/api/food',require('./routes/foodRouter'))
app.use('/api/user', require('./routes/userRouter')) 
app.use('/api/cart',require('./routes/cartRouter'))
app.use('/api/order',require('./routes/orderRouter'))

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})