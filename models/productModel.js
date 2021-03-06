// requires
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Schema del modelo
const ProductSchema = Schema({
    name: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['foods', 'technology', 'home'] },
    image: String
});

// Exportar Schema o modelo
module.exports = mongoose.model('Products', ProductSchema);
