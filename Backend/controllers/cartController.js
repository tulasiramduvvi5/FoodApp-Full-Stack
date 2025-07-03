const userModel = require('../models/userModel');

const addToCart = async (req, res) => {
    try {
        console.log("req.userId:", req.userId);
        const userData = await userModel.findById(req.userId);
        console.log("userData:", userData);

        
        let cartData = { ...userData.cartData };

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        
        await userModel.findByIdAndUpdate(req.userId, { cartData });

        res.status(200).json({ message: "Item added to Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        const cartData = userData.cartData;
        res.status(200).json({ cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        let cartData = { ...userData.cartData };

        if (cartData[req.query.itemId]) {
            cartData[req.query.itemId] -= 1;
            if (cartData[req.query.itemId] <= 0) {
                delete cartData[req.query.itemId]; 
            }
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });

        res.status(200).json({ message: "Item removed from Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addToCart, getCart, removeFromCart };
