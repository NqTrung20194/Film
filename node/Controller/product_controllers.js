const express = require('express');
const router = express.Router();
const product_models = require('./../Model/Product_models');
const categories_models = require('./../Model/Categories_models');

router.get('/index',(req,res)=>{
    //kiểm tra đăng nhập
   
        
        //console.log({kq:1,message:'Đăng nhập thành công'});
        product_models
        .find()
        .exec(function(err, data){
            if (err) {
                
                res.send({kq:0,err:err});
            }else {
                var check = '';
                var table ='';
                var i=0;
                
            data.forEach(e => {
                if (e.name!='') {
                    i++;
                    var parents='';
                    (e.status === false)? check = '' : check = 'checked';
                    table +=`
                  <tr id="vl_d`+e._id+`">
                    <td>`+i+`</td>
                    <td>`+e.name+`</td>
                    <td>`+e.price+`</td>
                    <td><input type="checkbox" `+check+` onclick = "status('`+e.status+`')"></td>
                    <td>
                    <button type="button" class="btn btn-primary" onclick="popup_edit('`+e._id+`','`+e.name+`','`+e.parents+`')" data-toggle="modal" data-target="#myModal"> <i class="fa fa-trash" aria-hidden="true"> </i> sửa</button>
                      <button type="button" class="btn btn-danger" onclick="popup_delete('`+e._id+`','`+e.name+`')" data-toggle="modal" data-target="#myModal"> <i class="fa fa-trash" aria-hidden="true"> </i> Xóa</button>
                    </td>
                  </tr>
                 `;
                }
                
            });
            
            var link = req.originalUrl;
            var main = 'products/index';
            res.render('index',{main:main,link:link, table:table});
            
        }
        });
        
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
                        product_models.findByIdAndDelete({_id:id},(err,data)=>{
                    if(err){
                        console.log({kq:0,err});
                    }
                    else{
                        console.log({kq:1,message:'đã xóa thành công'});
                    }
                });
            }
        })

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
            var main = 'products/add_products';

            //html parents
            var parents =selected='';
            docs.forEach(e => {
                // chids khác rổng là cha
                if (e.parents =='') {
                    //(e._id==docs.parents)? selected='selected':selected='';
                    parents += '<option value="'+e._id+'" >'+e.name+'</option>';
                        
                    e.childs.forEach(v => {
                        parents += '<option value="'+v._id+'" >'+v.name+'</option>'
                                });
                }

            });
            
            res.render('index',{main:main,link:link,parents:parents});
        }
    });
});

        router.post('/process', async (req, res)=>{
            // khai báo
            var name, parents, content,price, err='',status = true, flag=1;
            
            
            // lấy dữ liệu
            name = req.body.name;
            parents=req.body.parents;
            price=req.body.price;
            content=req.body.content;
            const sort = await categories_models.find({parents:parents});
            const obj_data={
                name: name,
                parents: parents,
                content: content,
                price: price,
                status : status,
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
                product_models.find({ name: name }, (err, data)=>{
                    if(err){
                        res.send({ kq:0, err:'Sản phẩm này đã có' });
                    }else{
                        if(data==''){
                            // thêm dữ liệu
                            product_models.create(obj_data, (err, data_insert)=>{
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


module.exports= router;