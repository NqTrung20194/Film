const express = require('express');
const router = express.Router();

const user_models = require('../Model/user_models');
// gọi bcrypt
const  bcrypt = require('bcrypt');
const saltRounds = 10;

// 1. gọi thư viện jsonwebtoken
const jwt= require('jsonwebtoken');
const token_models = require('../Model/token_models');
const serect = 'trung';

router.post('/regiter',(req,res)=>{
    var name,username, password,email, err, flat =1;
    username    = req.body.username;
    name        = req.body.name;
    password    = req.body.password;
    email       = req.body.email;
    
    if (name=='') {
        flat = 0;
        err= 'tên không được rổng';
    }
    if (password =='') {
        flat = 0;
        err = 'password không được rổng';
    }
    if (email =='') {
        flat = 0;
        err = 'email không được rổng';
    }
    //kết quả
    if (flat==1) {
        var obj_data = {};
        bcrypt.genSalt(saltRounds, function(err, salt){
          bcrypt.hash(password, salt, function(err, hash){
              if(err)
              {
                  res.send({kq:0, err:err});
              }
              else
              {
                  obj_data={
                    username:username,
                    name: name,
                    password: hash,
                    email: email,
                    role:'Api_regiter'
                };
              }
          });
      });
      
      // kết nối và xử lý với mongodb

      // 1. kiểm tra tên có tồn tại chưa
      user_models.find({ email: email }, (err, data)=>{
        if(err){
            res.send({ kq:0, err:'người dùng này đã có' });
        }else{
            if(data==''){
                //res.send(obj_data);
                // thêm dữ liệu
                user_models.create(obj_data, (err, data_insert)=>{
                    if(err){
                        res.send({ kq:0, err:err });
                    }else{
                      
                        res.send({ kq:1,data: data_insert });
                    }
                });
            }else{
                res.send({ kq:0, err:'Dữ liệu này đã tồn tại' });
            }
        }
    });
    }
    else{
        res.send(err); 
        email    = req.body.email;
        password    = req.body.password;
    }
    
})

// đăng nhập
router.post('/login',(req,res)=>{
    var email, password, err, flat =1;
    email = req.body.email;
    password = req.body.password;
    if(email=='')
      {
        flat = 0;
        err = 'Email không được rỗng';
      }
    if(flat==1)
    {
      user_models.find({ email: email }, (err, data)=>{
        if(data !=''){
              if (data !='') {

            bcrypt.compare(password,data[0].password,function(err,result)
            {
                if (result==true) 
                    {
                        var payload = {
                        'name': data[0].modelName,
                        'email':data[0].email,
                        'role' : data[0].role,
                        'device' : req.headers
                    };
                    jwt.sign(payload,serect,{expiresIn:60},(err,token)=>{
                        if(err){
                            res.send({kq:0,err:err})
                        }
                        else
                        {
                        res.send({kq:1,data:{token,data}});
                        // res.send({kq:1,data:email});
                        }
                    });

              }else{
                res.send({kq:0,err:'Mật khẩu không chính xác'});
              }
            });
          }
        }
        else{
            // console.log("err:", err)
            res.send({ kq:0, err:"Email không chính xác" });
        }
        // if(err){
        //     console.log(err);
        //     res.send
        // }
        // else{
        
        // }
    },[]);
  }
    else
    {
        res.send({kq:1, err: err});
    }
})

router.get('/logout/:id',(req,res)=>{
    var id = req.params.id;
    token_models
    .updateMany({id_user: id},{status:false},(err,data)=>{
        if (err) {
            res.send({kq:0, err:err});
        }else{
            if (data='') {
                res.send({kq:0,err:'Tên đăng nhập không tồn tại'});
            }else{
                res.send({kq:0,err:'Đăng xuất thành công'});
            }
        }
    });
})
router.get('/active/:id',(req,res)=>{
    var id = req.params.id;
    token_models
    .updateMany({id_user: id},{status:true},(err,data)=>{
        if (err) {
            res.send({kq:0, err:err});
        }else{
            if (data='') {
                res.send({kq:0,err:'Tên đăng nhập không tồn tại'});
            }else{
                res.send({kq:0,err:'Active thành công'});
            }
        }
    });
})

module.exports= router;