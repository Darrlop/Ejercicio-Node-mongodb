var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');


// GET /anuncios
// Devuelve todos los anuncios
// router.get('/', async (req, res, next) => {
//   try {
//     const resultado = await Anuncio.find();
//     res.json({result: resultado});
//     //res.render('index', {result: resultado}); 
//   } catch (error) {
//     console.log("Error en la petición de /anuncios:", error );
//     next(error);
//   }
// });

//GET /anuncios?start=1&limit4

router.get('/', async (req, res, next) => {
  try {

    skip = req.query.skip;
    limit = req.query.limit;
    orden = req.query.sort;

    //const resultado = await Anuncio.find().skip(skip).limit(limit);
    //const resultado = await Anuncio.find().sort({[orden]: 1});
    //const resultado = await Anuncio.find().sort({[orden]: 1}).skip(skip).limit(limit);

    

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

// GET /anuncios/id
// Devuelve el anuncio indicado en la id
router.get('/:id', async (req, res, next) => {
  try {
    const elId = req.params.id;
    const resultado = await Anuncio.findById(elId);
    res.json({result: resultado});
  } catch (error) {
    console.log("Error en la petición de /anuncios/id:", error );
    next(error);
  }
});

module.exports = router;
