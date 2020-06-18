const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 9000;

const server = app.listen(port,()=>{
    console.log(`Run server http://localhost:${ server.address().port }`);
});



