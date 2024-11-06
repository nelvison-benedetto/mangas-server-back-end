const products = require('../db/products.js');

const fs = require('fs');

const index = (req,res) =>{
    res.status(200).json({
        data : products,
        counter : products.length
    });
};
const show = (req,res)=>{
    const productIndex = 
};