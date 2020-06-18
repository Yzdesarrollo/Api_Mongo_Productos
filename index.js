// requires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// server
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//endpoints
// Get en general
app.get('/api/product', (req, res) => {
    res.send(200, { products: [] })
});

// Get individual
app.get('/api/product/:productId', (req, res) => {

});

app.post('/api/product', (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: 'Product OK' })
});

app.put('/api/product/:productId', () => {

});

app.delete('/api/product/:productId', (req, res) => {

});

// server connect
mongoose.connect('mongodb://localhost:27017/productsyzm', (error, res) => {
    if(error){
        return console.log(`Error al conectar a la base de datos: ${error}`)
    }
    console.log('Conexion establecida a la BD');

    const server = app.listen(port,()=>{
        console.log(`API REST corriendo en: http://localhost:${ server.address().port }`)
    });
    
});


