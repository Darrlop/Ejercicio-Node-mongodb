const mongoose = require('mongoose');

// Defino el esquema que daré a los anuncios de la tienda

const anuncioSchema = mongoose.Schema({
  nombre: {type: String, required: true},
  venta: {type: Boolean, required: true},
  precio: {type: Number, required: true},
  foto: {type: String},
  tags: {type: [String], required: true}
});


// Creo el modelo de anuncio y lo exporto

const Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;
