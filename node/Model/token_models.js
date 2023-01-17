// Kết nối mongoDB
const mongoose = require('mongoose');


// gọi schema
const schemaToken = mongoose.Schema({
    id_user : mongoose.Types.ObjectId,
    token : {
        type : String,
        require : true,
        unique : true
    },
    status : {
        type : Boolean,
        default:1
    }
});

// product vs category
//1. là để thêm 1 field cho category là listProducts
//2. là để thêm 1 field cho product là parents

//tạo collection
module.exports = mongoose.model('token',schemaToken);