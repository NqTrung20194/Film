const express = require('express');
const router = express.Router();

// gọi model
const product_models = require ('../Model/Product_models');
const categories_models = require ('../Model/Categories_models');

//test
// router.get('/',(req,res)=>{
//     res.send('Products');
// })


// 1. add

router.post('/add',(req,res)=>{

    var name,id_parents, parents,obj_update, content,listProducts, sort, err, flag = 1;
    //lấy dử liệu
    name = req.body.name;
    parents = req.body.parents;
    content = req.body.content;
    price = req.body.price;
    
    // kiểm tra dử liệu
    if (name=='') {
        err ='tên không được rỗng';
        flag = 0;
    }
    if (parents=='') {
        err ='danh mục không được rỗng';
        flag = 0;
    }
    
            
    if (flag==1) {
                categories_models
                .find({ name : parents})
                .exec((err, data)=>{
                    if (err) {
                        res.send({kq:0,err:err});
                    }else{
                        // res.send({kq:1,data:data[0]});
                        // update sản phẩm vào listproduct categories
                        id_parents = data[0]._id;
                        //res.send(id_parents);
                            //res.send(name + '/' +parents + '/' +content+ '/' +id_parents);
                            //res.send('hello');
                                const obj_update_id =  {_id:id_parents};
                                    categories_models
                                    .updateMany(obj_update_id,{$addToSet: {"listProducts" : name}},(err,data)=>{
                                        if(err){
                                            res.send({kq:0,err:err});
                                        }
                                        else{
                                            //res.send({kq:1,data:data});
                                        }
                                    });

                                    obj_insert={
                                        name:name,
                                        parents:parents,
                                        content:content,
                                        price:price
                                    };
                                    product_models
                                    .create(obj_insert,(err,data)=>{
                                        if (err) {
                                            res.send({kq:0,err:err});
                                        }else{
                                            res.send({kq:1,data:data});
                                        }
                                    });
                            }
                        });
        }
    else{
        res.send(err);
    }
    });
// 2. edit
router.post('/edit/:id',(req,res)=>{

    var name,id_parents,oldname, parents,obj_update,obj_update_id, content,listProducts,listCategories, sort, err, flag = 1;
    //lấy dử liệu
    name = req.body.name;
    parents = req.body.parents;
    content = req.body.content;
    price = req.body.price;
    // kiểm tra dử liệu
    if (name=='') {
        err ='tên không được rỗng';
        flag = 0;
    }
    if (parents=='') {
        err ='danh mục không được rỗng';
        flag = 0;
        
    }
    
        if(flag ==1){
    // lấy dử liệu sản phẩm
    product_models
    .find({_id:req.params.id})
    .exec((err,data)=>{
        if(err){
            res.send({kq:0,err:"sai ở lấy dử liệu sản phẩm"});
        }else
            {   oldname = data[0].name;
               
                // xóa tên sản phẩm khỏi categories cũ
                //res.send({kq:1,data:data[0].parents});
                categories_models.find({name:data[0].parents}).exec((err,data)=>{
                    
                    if(err){
                        res.send({kq:0,err:"Sai ở xóa categories cũ"});
                    }else{
                        //res.send({kq:1,data:data});
                        obj_update_id = {_id:data[0]._id};
                        categories_models
                        .updateMany (obj_update_id,{$pull: {listProducts : oldname} },(err,data)=>{
                            if(err){
                                res.send({kq:0,err:"sai ở update many"});
                            }
                            else{
                                //res.send({kq:1,data:data});
                                // thêm tên sản phẩm vào categories mới
                                categories_models
                                .find({ name : parents})
                                .exec((err, data)=>{
                                    if (err) {
                                        res.send({kq:0,err:"sai ở add categories mới"});
                                    }else{
                                        // res.send({kq:1,data:data[0]});
                                        // update sản phẩm vào listproduct categories
                                        id_parents = data[0]._id;
                                        const obj_update_id_2 =  {_id:id_parents};
                                                categories_models
                                                .updateMany(obj_update_id_2,{$addToSet: {"listProducts" : name}},(err,data)=>{
                                                    if(err){
                                                        res.send({kq:0,err:"sai ở add categories mới 2"});
                                                    }
                                                    else{
                                                        //res.send({kq:1,data:data});

                                                        // update lại thông tin sản phẩm
                                                        obj_update = {
                                                            'name':name,
                                                            'parents':parents,
                                                            'content':content,
                                                            'price':price
                                                        }
                                                        const id = {_id:req.params.id};
                                                        //res.send(id);
                                                        product_models.updateMany(id,obj_update,(err,data)=>{
                                                            if(err){
                                                                res.send({kq:0,err:"sai ở update dử liệu"});
                                                            }
                                                            else{
                                                                res.send({kq:1,data:data});
                                                            }
                                                        }); 
                                                    }
                                                });
                                            }
                                        });
                            }
                        });
                    }
                })
            
            }
    });
}else{
    res.send(err);
}
    });
// 3. xóa 1 sản phẩm
 router.post('/deleteOne/:id',(req,res)=>{
    var id, obj_update_id,oldname,listProducts, err='',mess = '',flag=1;
    // lấy dử liệu
     id = req.params.id;
    // kiểm tra dử liệu
    if (id=='') {
        flag=0;
        err='không thể tìm và xóa';
    } else{
        product_models
        .find({_id:req.params.id})
        .exec((err,data)=>{
            if(err){
                flag = 0;
                res.send({kq:0,err:err});
            }else{
                flag = 1;
            }
        });
    }
    
    
    if (flag==1) {

    product_models
    .find({_id:req.params.id})
    .exec((err,data)=>{
        if(err){
            res.send({kq:0,err:err});
        }else
            {   oldname = data[0].name;

                categories_models
                .find({name:data[0].parents})
                .exec((err,data)=>{
                    
                if(err){
                    res.send({kq:0,err:"Sai ở xóa categories cũ"});
                }else{
                    //res.send({kq:1,data:data});
                    obj_update_id = {_id:data[0]._id};
                    categories_models
                    .updateMany (obj_update_id,{$pull: {listProducts : oldname} },(err,data)=>{
                        if(err){
                            res.send({kq:0,err:"sai ở update many"});
                        }
                        else{
                        //res.send({kq:1,data:data});
                        //kết nối database và xử lý
                        product_models.findByIdAndDelete({_id:req.params.id},(err,data)=>{
                            if (err) {
                                res.send({kq:0,err:err});
                            }else{
                                
                                res.send({kq:1,mess:'Đã xóa thành công'});
                                }
                            });
                            }
                            });
                        }
                    });
                    
                }
            });
    }
})

// 4. lấy toàn bộ sản phẩm cùng categories
router.post('/allProduct/:nameCategories',(req,res)=>{
    var id, flag = 1;
    id = req.params.idCategories;
    if (id=='') {
        flag=0;
        err='không thể tìm';
    } else{
        categories_models
        .find({name:req.params.nameCategories})
        .exec((err,data)=>{
            if(err){
                flag = 0;
                res.send({kq:0,err:err});
            }else{
                flag = 1;
                 //res.send({kq:1,data:data});
            }
        });
    }

    if(flag == 1){
        product_models
        .find({parents:req.params.nameCategories})
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

// 4. lấy 1 sản phẩm
router.get('/:id',(req,res)=>{
    var id, flag = 1;
    id = req.params.idCategories;
    if (id=='') {
        flag=0;
        err='không thể tìm';
    }

    if(flag == 1){
        product_models
        .find({_id:req.params.id})
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