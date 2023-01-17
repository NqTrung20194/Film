// Kết nối mongoDB
const mongoose = require('mongoose');


// gọi schema
const schemaProduct = mongoose.Schema({
    
    name : {
        type : String,
        require : true,
        unique : true
    },
    price:{
        type: Number,
        default:0
    },
    parents:Array,
    content:String,
    status : {
        type : Boolean,
        default:0
    },
    ViewProduct : {
        type : Number,
        default:0
    }
    ,
    trash : {
        type : Boolean,
        default:0
    }
});

// product vs Product
//1. là để thêm 1 field cho Product là listProducts
//2. là để thêm 1 field cho product là parents

//tạo collection
module.exports = mongoose.model('product',schemaProduct);