'use estrict';

const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const readLinea = require('node:readline');


main().catch(err => console.log('Se ha producido un error', err));

async function main(){
    await new Promise( (resolve) => connection.once('open', resolve) );

    // confirmamos el borrado inicial antes de hacerlo:
    console.log("\n ================================= ");
    console.log(" ==== Inicialización de la BD ==== ");
    console.log(" ================================= \n");
    console.log(" >>> Atención: Se fomateará la BD y se introducirán los datos iniciales mínimos.");
    const borrar = await fPregunta(" >>> El contenido anterior de la BDs será borrado. Introduce 's' si deseas continuar... ");
    if (!borrar){
        console.log ("Inicialización abortada");
        process.exit();
    }

    await inicializarAnuncios();
    connection.close();
}

async function inicializarAnuncios(){

    const borrado = await Anuncio.deleteMany();
    console.log(`... Se han eliminado ${borrado.deletedCount} documentos de anuncios de la BD ${connection.name}`);

    const implantados = await Anuncio.insertMany([
        {nombre: "libreta", venta: true, precio: 5.50, foto: "libreta", tags: "work"},
        {nombre: "caja regalo cuqui", venta: false, precio: 15, foto: "caja_cuqui", tags: "lifestyle"},
        {nombre: "escritorio", venta: true, precio: 120, foto: "escritorio", tags: "work"},
        {nombre: "bicicleta", venta: true, precio: 150, foto: "bicicleta", tags: "lifestyle"},
        {nombre: "funda volante", venta: false, precio: 30, foto: "funda_volante", tags: ["motor"]},
        {nombre: "funda movil", venta: false, precio: 10, foto: "funda", tags: ["lifestyle", "mobile"]},
        {nombre: "casco moto", venta: true, precio: 120, foto: "casco_moto", tags: ["lifestyle", "motor"]},
        {nombre: "samsung a52", venta: true, precio: 190, foto: "a52", tags: "mobile"},
        {nombre: "luz mesa", venta: false, precio: 25.50, foto: "luz_mesa", tags: "work"},
        {nombre: "chaqueta cuero", venta: true, precio: 140, foto: "chaqueta", tags: "lifestyle"},
        {nombre: "soporte movil", venta: true, precio: 35, foto: "soporte", tags: ["mobile", "motor"]},
        {nombre: "pantalla iphone", venta: false, precio: 90, foto: "pantalla", tags: "mobile"},
        {nombre: "apple pencil", venta: true, precio: 99.99, foto: "pencil", tags: "mobile"},
        {nombre: "camiseta", venta: true, precio: 9.99, foto: "camiseta", tags: "lifestyle"}
    ]);
    console.log("... Introducidos " + implantados.length + " anuncios.");
}

function fPregunta(texto) {
    return new Promise((resolve, reject) => {
      // conectamos la consola con el módulo readline 
      const ifc = readLinea.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      ifc.question(texto, respuesta => {
        ifc.close();
        resolve(respuesta.toLowerCase() === 's');
      })
    });
  }