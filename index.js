// requires
const express = require('express');
const bodyParser = require('body-parser');
// server
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(bodyParser.urlencoded({extended: false}) );
app.use(bodyParser.json());

//endpoints
app.get('/home/:name', (req,res)=>{
    res.send({
        message: `Welcome ${req.params.name} a mi api REST `
    })
});

// server connect
const server = app.listen(port,()=>{
    console.log(`Run server http://localhost:${ server.address().port }`);
});



