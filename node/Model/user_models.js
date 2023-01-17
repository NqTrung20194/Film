// Kết nối mongoDB
const mongoose = require('mongoose');


// gọi schema
const schemaUser = mongoose.Schema({
    id_user: mongoose.Types.ObjectId,
    name : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type :String,
        require :true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    role:Array,
    active : {
        type : Boolean,
        default:0
    },
    trash : {
        type : Boolean,
        default:1
    }
});

// product vs category
//1. là để thêm 1 field cho category là listProducts
//2. là để thêm 1 field cho product là parents

//tạo collection
module.exports = mongoose.model('users',schemaUser);