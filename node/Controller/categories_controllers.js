const express = require('express');
const { countDocuments } = require('./../Model/Categories_models');
const router = express.Router();
const categories_models = require('./../Model/Categories_models');
// 1. gọi thư viện jsonwebtoken
const jwt= require('jsonwebtoken');
const serect = 'trung';
// goi localstorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const url = 'http://localhost:3000/admin/login/index';
// function checkLogin (req,res,next){
//    //get item
//    var token = localStorage.getItem('token');
//    //console.log(token);
//    jwt.verify(token,serect,(err,data)=>{
//        if(err){
//            //res.send({kq:0,err:err})
//            res.redirect(url);
//        }
//        else{
//            next();
//        }
// });
// }

// function checkRole(req,res,next){
//     //get item
//    var token = localStorage.getItem('token');
//    //console.log(token);
//    jwt.verify(token,serect,(err,data)=>{
//        if(err){
//            //res.send({kq:0,err:err})
//            res.redirect(url);
//        }
//        else{
//            // lấy được thông tin trong payload, có chứa role
//            //vd hiện tại có 3 quyền: admin = 1, user = 2, guide = 3
//            // Mở rộng quyền sau : phòng kế toán = 4, phòng kinh doanh = 5
//            // 1: toàn quyền
//            // 2. được xem, thêm và sửa, không được xóa
//            // 3. được xem
//            // 4. chỉ được thực hiện chức năng phòng kế toán
//            // 5. chỉ được thực hiện chức năng phòng kinh doanh
//            if (data[0].role==1|| data[0].role==2) {
//             next();    
//            }else{
//                res.send({kq:0,message:'Bạn không có quyền truy cập hoặc thực hiện chức năng'});
//            }
           
//        }
// });
// }

router.get('/index',(req,res)=>{
    //kiểm tra đăng nhập
   
        
        //console.log({kq:1,message:'Đăng nhập thành công'});
        categories_models.aggregate([
            {
              "$lookup":
                {
                  "from": "categories",
                  "localField": "name",
                  "foreignField": "parents",
                  "as": "childs"
                }
           }
         ]).exec(function(err, data){
            if (err) {
                
                res.send({kq:0,err:err});
            }else {
                var table ='';
                var i=0;
                var j =0;
            data.forEach(e => {var  j=0 ;
                if (e.parents=='') {
                    i++;
                    table +=`
                  <tr id="vl_d`+e._id+`">
                  <td>`+i+`</td>
                    <td>`+e.name+`</td>
                    <td><input type="checkbox" onclick = "status('`+e._id+`')"></td>
                    <td>
                    <button type="button" class="btn btn-primary" onclick="popup_edit('`+e._id+`','`+e.name+`','`+e.parents+`')" data-toggle="modal" data-target="#myModal"> <i class="fa fa-trash" aria-hidden="true"> </i> sửa</button>
                      <button type="button" class="btn btn-danger" onclick="popup_delete('`+e._id+`','`+e.name+`')" data-toggle="modal" data-target="#myModal"> <i class="fa fa-trash" aria-hidden="true"> </i> Xóa</button>
                    </td>
                  </tr>
                 `;
                 e.childs.forEach(v => {j++;
                    table +=`
                  <tr id="vl_d`+v._id+`">
                  <td>`+i+`.`+j+`</td>
                    <td>`+v.name+`</td>
                    <td><input type="checkbox" onclick = "status('`+v._id+`')"/></td>
                    <td>
                    <button type="button" class="btn btn-primary" onclick="popup_edit('`+v._id+`','`+v.name+`','`+v.parents+`')" data-toggle="modal" data-target="#myModal"> <i class="fa fa-trash" aria-hidden="true"> </i> sửa</button>
                    <button type="button" class="btn btn-danger" onclick="popup_delete('`+v._id+`','`+v.name+`')" data-toggle="modal" data-target="#myModal"> <i class="fa fa-trash" aria-hidden="true"> </i> Xóa</button>
                    </td>
                  </tr>
                 `;
                            });
                }
                
            });

            //html parents
            var parents =selected='';
            data.forEach(e => {
                // chids khác rổng là cha
                if (e.parents =='') {
                    (e.name==data[0].parents)? selected='selected':selected='';
                    parents += '<option value="'+e.name+'" '+selected+'>'+e.name+'</option>';
                        
                    e.childs.forEach(v => {
                        (v.name==data[0].parents)? selected='selected':selected='';
                        parents += '<option value="'+v.name+'" '+selected+'>'+v.name+'</option>'
                                });
                }

            });
            
            var link = req.originalUrl;
            var main = 'categories/index';
            res.render('index',{main:main,link:link, table:table});
            
        }
        });
        
    });

    


router.get('/add',(req,res)=>{


    categories_models.aggregate([
        {
          "$lookup":
            {
              "from": "categories",
              "localField": "name",
              "foreignField": "parents",
              "as": "childs"
            }
       }
     ]).exec(function(err, docs){
        if (err) {
            res.send({kq:0,err:err});
        }else {
            // lấy link
            var link = req.originalUrl;
            // main
            var main = 'categories/add_categories';

            //html parents
            var parents =selected='';
            docs.forEach(e => {
                // chids khác rổng là cha
                if (e.parents =='') {
                    //(e._id==docs.parents)? selected='selected':selected='';
                    parents += '<option value="'+e.name+'" >'+e.name+'</option>';
                        
                    e.childs.forEach(v => {
                        parents += '<option value="'+v.name+'" >'+v.name+'</option>'
                                });
                }

            });
            
            res.render('index',{main:main,link:link,parents:parents});
        }
    });
});



router.get('/edit/:id',(req,res)=>{
    var idf ={_id:req.params.id};
     categories_models.find(idf,(err,data)=>{

        if (err) {
            res.send({kq:0,err:err});
        }else {

            categories_models.aggregate([
                {
                "$lookup":
                    {
                    "from": "categories",
                    "localField": "name",
                    "foreignField": "parents",
                    "as": "childs"
                    }
            }
            ]).exec(function(err, docs){
                if (err) {
                    res.send({kq:0,err:err});
                }else {
                    // lấy link
                    var link = req.originalUrl;
                    // main
                    var main = 'categories/edit_categories';

                    //html parents
                    var parents =selected='';
                    docs.forEach(e => {
                        // chids khác rổng là cha
                        if (e.parents =='') {
                            (e.name==data[0].parents)? selected='selected':selected='';
                            parents += '<option value="'+e.name+'" '+selected+'>'+e.name+'</option>';
                                
                            e.childs.forEach(v => {
                                (v.name==data[0].parents)? selected='selected':selected='';
                                parents += '<option value="'+v.name+'" '+selected+'>'+v.name+'</option>'
                                        });
                        }

                    });
                    
                    res.render('index',{main:main,link:link,parents:parents,data:data[0]});
                }
            });}
        });
});

router.post('/index',(req,res)=>{
    var name, parents, content,id, err='', flag=1;
    name = req.body.name;
    parents=req.body.parents;
    content=req.body.content;
    id=req.body.id;
    const obj_update = {
        'name': name,
        'parents': parents,
        'content': content
    };
            const obj_update_id = {_id:id};

            categories_models.updateMany(obj_update_id,obj_update,(err,data)=>{
            if(err){
                console.log({kq:0,err:err});
            }
            else{
                res.redirect('/categories/index');
                
            }
        });
});

router.post('/process', async (req, res)=>{
    // khai báo
    var name, parents, content, err='', flag=1;
    
    
    // lấy dữ liệu
    name = req.body.name;
    parents=req.body.parents;
    content=req.body.content;
    const sort = await categories_models.find({parents:parents});
    const obj_data={
        name: name,
        parents: parents,
        content: content,
        sort: (sort.length +1)
    };
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
        categories_models.find({ name: name }, (err, data)=>{
            if(err){
                res.send({ kq:0, err:'người này đã có' });
            }else{
                if(data==''){
                    // thêm dữ liệu
                    categories_models.create(obj_data, (err, data_insert)=>{
                        if(err){
                            res.send({ kq:0, err:err });
                        }
                        else{
                            res.send({ kq:1, message: 'Thêm thành công' });
                        }
                    });
                }else{
                    res.send({ kq:0, err:err });
                }
            }
        });
    }else{
        res.send({ kq:0, err:err });
    }
});

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
                categories_models.findByIdAndDelete({_id:id},(err,data)=>{
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