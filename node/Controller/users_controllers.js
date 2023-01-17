const express = require('express');
const router = express.Router();
const user_models = require('../Model/user_models');



router.get('/index(/:page)?',async(req,res)=>{
  // số trang
  const page = req.params.page;

  // lấy tổng số dữ liệu
  const objData= await user_models.find();
  sumData = objData.length;

  //giới hạn trang
  const limit = 4;
  // tính số page
  const sumPage = Math.ceil(sumData/limit);
  //vị trí bắt đầu
  const skip = (page-1)* limit;

    user_models
    .find()
    .limit(limit)
    .skip(skip)
    .sort({_id:-1})
    .exec(function(err, data){
        if (err) {
            res.send({kq:0,err:err});
        }else { 
            var table ='';
            var i=0;
            
        data.forEach(e => {
                i++;
                table +=`
              <tr id="vl_d`+e._id+`">
              <td>`+i+`</td>
              <td><i class="fa fa-upload" aria-hidden="true">Upload</i></td>
                <td>`+e.name+`</td>
                <td><input type="checkbox" onclick = "status('`+e._id+`')"></td>
                <td>
                  <button type="button" class="btn btn-danger" onclick="popup_delete('`+e._id+`','`+e.name+`')" data-toggle="modal" data-target="#myModal"> <i class="fa fa-trash" aria-hidden="true"> </i> Xóa</button>
                </td>
              </tr>
            `;
            
        });
        
        
        var disabled =''; 
          (req.params.page > 1)?disabled='':disabled='disabled';
          var  pagination='' ;
        pagination +=`<li class="page-item `+disabled+`" ><a class="page-link " href="/admin/users/index/1" >Firts</a></li>`;
        pagination +=`<li class="page-item `+disabled+`" ><a class="page-link " href="/admin/users/index/`+(req.params.page-1)+`" >Previous</a></li>`;
        for(var i=1; i<= sumPage; i++){
          var active ='';
          (i==page)?active='active':'';
          pagination +=`<li class="page-item `+active+`"><a class="page-link " href="/admin/users/index/`+i+`" >`+i+`</a></li>`;
        }
        (req.params.page == sumPage)?disabled='disabled':disabled='';
        pagination += ` <li class="page-item `+disabled+`"><a class="page-link" href="/admin/users/index/`+(++req.params.page)+`">Next</a></li>`;
        pagination += ` <li class="page-item `+disabled+`"><a class="page-link" href="/admin/users/index/`+sumPage+`">Last</a></li>`;
        var link = req.originalUrl;
        var main = 'users/main_users';
        res.render('index',{main:main,link:link, table:table,pagination:pagination});
        }
    });
});

router.get('/add',(req,res)=>{

        // lấy link
        var link = req.originalUrl;
        // main
        var main = 'users/add_user';        
        res.render('index',{main:main,link:link});
    

});

// gọi bcrypt
const  bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/process',  (req, res)=>{
  // khai báo
  var name, password, email, err='', flag=1;
  

  // lấy dữ liệu
  name = req.body.name;
  password=req.body.password;
  email=req.body.email;
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
              name: name,
              password: hash,
              email: email
          };
        }
    });
});
  
  //res.send(obj_data);
  // kiểm tra dữ liệu
  // 1. tên không được rỗng
  if(name=='')
  {
      flag=0;
      err='Tên không được rỗng';
  }

  if(flag==1){
      // kết nối và xử lý với mongodb

      // 1. kiểm tra tên có tồn tại chưa
      user_models.find({ email: email }, (err, data)=>{
          if(err){
              res.send({ kq:0, err:'người dùng này đã có' });
          }else{
              if(data==''){
                  // thêm dữ liệu
                  user_models.create(obj_data, (err, data_insert)=>{
                      if(err){
                          res.send({ kq:0, err:err });
                      }else{
                        
                          res.send({ kq:1, message: 'Thêm thành công' });
                      }
                  });
              }else{
                  res.send({ kq:0, err:'Dữ liệu này đã tồn tại' });
              }
          }
      });
  }else{
      res.send({ kq:0, err:err });
      
  }
});

// gọi nodemailer

// Điều kiện để gửi mail
// 1. có 1 tk gửi mail: không quan trọng
// 2.cài đặt tk gửi mail
// 2.1 Bật pop/imap
// 2.2 Bật quyền truy cập kém an toàn
// 2.3 xác nhận cảnh báo bên gmail
// 3. Tài khoảng nhận email (Tiêu đề , nội dung)
var nodemailer = require('nodemailer');

router.post('/sendmail',(req,res)=>{
  //res.send('hello');
  var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '****',
    pass: '****'
  }
});

var mailOptions = {
  from: 'quoctrung.engineer@gmail.com',
  to: 'nqtrung20194@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})

//xóa 1 dử liệu
router.post('/deleteOne',(req,res)=>{
  var id, err='',flag=1;
  // lấy dử liệu
  id = req.body.id;
  //kiểm tra dử liệu
  if (id=='') {
      flag=0;
      err='không tồn tại phần tử này';
  } 
  if (flag==1) {
      //kết nối database và xử lý
              user_models.findByIdAndDelete({_id:id},(err,data)=>{
          if(err){
              console.log({kq:0,err});
          }
          else{
              
              console.log({kq:1,message:'đã xóa thành công'});
              
          }
      });
  }
})

module.exports= router;