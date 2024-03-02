'use strict'

var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');


// GET /
// renderiza una lista de anuncios filtrados

router.get('/', async (req, res, next) => {
  try {

    const filterByTag = req.query.tag;
    const filterByVenta = req.query.venta;
    const filterByNombre = req.query.nombre;
    const precioMin = req.query.precioMin;  
    const precioMax = req.query.precioMax;

    const skip = req.query.skip;
    const limit = req.query.limit;
    const sort = req.query.sort;
    const fields = req.query.fields;
    const filter = {};

    if (filterByTag)            filter.tags = filterByTag;
    if (filterByVenta)          filter.venta = filterByVenta;
    if (filterByNombre)         filter.nombre = filterByNombre;
    if (precioMin && precioMax) filter.precio = {$gte: precioMin, $lte: precioMax}; // rango de precio
    

    //const anuncios = await Anuncio.listar(filter, skip, limit, sort, fields);
    res.locals.anuncios = await Anuncio.listar(filter, skip, limit, sort, fields);
    res.render('index', {marca: 'Nodepop' });
    
  } catch (error) {
    console.log("Error en la petición /:", error );
    next(error);
  }
});


// /* GET home page. */ 
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



module.exports = router;
