// Kết nối mongoDB
const mongoose = require('mongoose');


// gọi schema
const schemaCategory = mongoose.Schema({
    
    id_user: mongoose.Types.ObjectId,
    name : {
        type : String,
        require : true,
        unique : true
    },
    parents:Array,
    listProducts:Array,
    content:String,
    sort:String,
    status : {
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
module.exports = mongoose.model('categories',schemaCategory);