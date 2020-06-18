// requires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import Schema o models
const ProductModel = require('./models/productModel');
const e = require('express');

// server
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//endpoints
// Get en general
app.get('/api/product', (req, res) => {

    ProductModel.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
        if (!products) return res.status(404).send({ message: 'No existen los productos' })

        res.status(200).send({ products })
    })
});

// Get individual
app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId

    ProductModel.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
        if (!product) return res.status(404).send({ message: `El producto no existe` })

        res.status(200).send({ product: product })
    })

});

app.post('/api/product', (req, res) => {

    //probando si llegan los datos
    console.log('POST:/api/product');
    console.log(req.body);

    // instanciando el modelo
    let products = new ProductModel()

    // propiedades del modelo
    products.name = req.body.name
    products.price = req.body.price
    products.category = req.body.category
    products.image = req.body.image

    products.save((err, data) => {
        if (err) return res.status(500).send({ message: `no se pudo guardar los datos: ${err}` })
        res.status(200).send({ products: data })
    })
});

app.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    let body = req.body

    ProductModel.findByIdAndUpdate(productId, body, (err, productUpdated) => {
        if(err) res.status(500).send({ message: `Error al actualizar el producto: ${err}` })
        res.status(200).send({ product: productUpdated })
    })
});

app.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId

    ProductModel.findById(productId, (err, product) => {
        if (err) res.status(500).send({ message: `Error al borrar el producto: ${err}` })

        product.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el producto: ${err}` })
            res.status(200).send({ message: 'El producto ha sido eliminado' })
        })
    })
});

// server connect
mongoose.connect('mongodb://localhost:27017/productsyzm', (error, res) => {
    if (error) {
        return console.log(`Error al conectar a la base de datos: ${error}`)
    }
    console.log('Conexion establecida a la BD');

    const server = app.listen(port, () => {
        console.log(`API REST corriendo en: http://localhost:${server.address().port}`)
    });

});


