var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

/*

// GET /anuncios
// Devuelve todos los anuncios
router.get('/', async (req, res, next) => {
  try {
    const resultado = await Anuncio.find();
    res.json({result: resultado});
    //res.render('index', {result: resultado}); 
  } catch (error) {
    console.log("Error en la petición de /anuncios:", error );
    next(error);
  }
});

// GET /anuncios/tag
// Devuelve los tags existentes en la BD

router.get('/tags', async (req, res, next) => {
  try {
    const resultado = await Anuncio.distinct("tags");
    res.json({result: resultado});
  } catch (error) {
    console.log ("Error en la petición de /anuncios/tags:", error);
    next(error);
  }
});
*/

module.exports = router;
