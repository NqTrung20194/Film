const express = require('express');
const router = express.Router();

// gọi model
const categories_models = require ('../Model/Categories_models');
const product_models = require ('../Model/Product_models');
//1. thêm
router.post('/add',(req,res)=>{

    var name, parents, content,listProducts, sort, err, flag =1;
    //lấy dử liệu
    name = req.body.name;
    parents = req.body.parents;
    content = req.body.content;
    listProducts = req.body.listProducts;
    // kiểm tra dử liệu
    if (name=='') {
        err ='tên không được rỗng';
        flag = 0;
    }
    
    obj_insert={
        name:name,
        parents:parents,
        content:content,
        listProducts:listProducts
    }
    // tổng kết
    if (flag==1) {
        //res.send(name + '/' +parents + '/' +content);
        //res.send('hello');
        categories_models
        .create(obj_insert,(err,data)=>{
            if (err) {
                res.send({kq:0,err:err});
            }else{
                res.send({kq:1,data:data});
            }
        })
    }else{
        res.send(err);
    }
    
    });
// 2. lấy danh mục cha con
router.get('/Parentschilds',(req,res)=>{
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
            }else{
                res.send({kq:1,data:data});
            }
        });
});

    // 3. lấy thông tin 1 danh mục
    router.get('/inforCategories/:id',(req,res)=>{
        categories_models
        .find({_id:req.params.id})
        .exec((err, data)=>{
            if (err) {
                res.send({kq:0,err:err});
            }else{
                res.send({kq:1,data:data});
            }
        });
    });
    // 4. sửa danh mục
    router.post('/editCategories/:id',(req,res)=>{
        var name, parents, content,id, status,listProducts, err='', flag=1;
        name = req.body.name;
        parents=req.body.parents;
        content=req.body.content;
        status=req.body.status;
        listProducts=req.body.listProducts;
        id=req.params.id;
        const obj_update = {
            'name': name,
            'parents': parents,
            'content': content,
            'status':status,
            'listProducts' : listProducts
        };
                const obj_update_id = {_id:id};
    
                categories_models.updateMany(obj_update_id,obj_update,(err,data)=>{
                    if (err) {
                        res.send({kq:0,err:err});
                    }else{
                        res.send({kq:1,data:data});
                    }
            });
    });
    // 5.xóa 1 danh mục
        router.post('/deleteOne/:id',(req,res)=>{
            var id, err='',mess = '',flag=1;
            // lấy dử liệu
            id = req.params.id;
            //kiểm tra dử liệu
            if (id=='') {
                flag=0;
                err='không tồn tại phần tử này';
            } 
            if (flag==1) {
                //kết nối database và xử lý
                        categories_models.findByIdAndDelete({_id:id},(err,data)=>{
                if (err) {
                    res.send({kq:0,err:err});
                }else{
                    res.send({kq:1,mess:'Đã xóa thành công'});
                }
                });
            }
        })
    // 7. lấy tất cả sản phẩm thuộc danh mục
        router.get('/:nameCategory',(req,res)=>{
            //tổng số sp
            // var arr= await product_models.find();
            // var sumData = arr.length;
            
            product_models
            .find({parents:req.params.nameCategory})
            .exec((err, data)=>{
                if (err) {
                    res.send({kq:0,err:err});
                }else{
                    res.send({kq:1,data:data});
                }
            });
        })
    // 8. lấy tất cả sản phẩm
    router.get('/',(req,res)=>{
        //tổng số sp
        // var arr= await product_models.find();
        // var sumData = arr.length;
        
        product_models
        .find()
        .exec((err, data)=>{
            if (err) {
                res.send({kq:0,err:err});
            }else{
                res.send({kq:1,data:data});
            }
        });
    })

    // 5. lấy sản phẩm liên quan
        router.get('/:parents/:id',(req,res)=>{
            var id, flag = 1;
            id = req.params.id;
            if (id=='') {
                flag=0;
                err='không thể tìm';
            }

            if(flag == 1){
                product_models
                .find({parents:req.params.parents, _id : {"$ne" : req.params.id}})
                .exec((err,data)=>{
                    if(err){
                        flag = 0;
                        res.send({kq:0,err:err});
                    }else{
                        res.send({kq:1,data:data});
                    }
                });
            }
        });
        
module.exports= router;