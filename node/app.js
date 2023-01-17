const express = require('express');
const app = express();

// gọi bodyParser

const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// json
app.use(bodyParser.json());

// gọi database
require('./database');

// mở api
app.use((req, res, next)=>{
    // port dung voi sever goi url
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
// gọi view ejs

app.set('view engine','ejs');


// set đường truyền tịnh tuyến
app.use(express.static(__dirname + '/public'));



// // test
//     app.get('/index',(req,res)=>{
//         res.send('hello');
//     });

// gọi controller
const Control_controller =require('./Controller/Control_controller');
app.use('/',Control_controller);



    app.listen(3100,()=>{
        console.log('đã bật server');
    })