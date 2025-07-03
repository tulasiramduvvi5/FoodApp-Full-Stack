const foodModel = require('../models/foodModel')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')


const addFood = async(req,res)=>{
    let image_filename=`${req.file.filename}`


    try{
        
    await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
        res.send(201).json({"message":"Food Added"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({"message":error.message})
    }
}

const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({data:foods})
    } catch (error) {
        console.log(error)
         res.status(500).json({"message":"Error Listing Food"})
    }
}


const removeFood = async(req,res)=>{
    try {
        const {id} = req.query
        console.log(id);
        const food = await foodModel.findById(id)
        if(!food){
            return res.status(404).json({"message":"Food not found"})
        }
        await fsPromises.unlink(path.join(__dirname,'..','uploads',`${food.image}`))
        await foodModel.deleteOne({_id:id})
        res.status(200).json({"message":"Food deleted successfully"})
    } catch (error) {
        console.log(error)
         res.status(500).json({"message":"Error deleting food"})
    }
}

module.exports = {addFood,listFood,removeFood}