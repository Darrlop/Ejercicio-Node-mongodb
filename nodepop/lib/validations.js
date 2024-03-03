'use strict'
const {query, validationResult, body} = require('express-validator');

const validator ={
  validaQuery:
  [  // array validaciones para get
    query('precioMin').optional().isNumeric().withMessage("Ha de ser numérico"),
    query('precioMax').optional().isNumeric().withMessage(" Ha de ser numérico"),
    query("precioMax").optional().custom( (valor, {req}) => {
      return (parseInt(valor) >= parseInt(req.query.precioMin)) ? true : false;  
    }).withMessage("El precio máximo no puede ser menor que el precio mínimo"),
    query('skip').optional().isNumeric().withMessage("Los parámetros de paginación han de ser numéricos"),
    query('limit').optional().isNumeric().withMessage("Los parámetros de paginación han de ser numéricos"),
    query('tag').optional().isIn(['lifestyle', 'mobile', 'motor', 'work']).withMessage("Valor no válido. Etiquetas válidas: lifestyle, mobile, motor, work ") ,
    query('venta').optional().isBoolean().withMessage("Sólo valores booleanos. True: venta, false: compra")
 ],
 validaBody:
 [  // array validaciones para post
    body('nombre').notEmpty().withMessage("El campo es obligatorio"),
    body('venta').isBoolean().withMessage("Sólo valores booleanos. True: venta, false: compra"),
    body('precio').isNumeric().withMessage("El campo tiene que ser un valor numérico (con o sin decimnales)"),
    body('tags').isIn(['lifestyle', 'mobile', 'motor', 'work']).withMessage("Etiqueta inválida. Disponibles: lifestyle, mobile, motor, work ") ,
 ]
}


module.exports = validator;