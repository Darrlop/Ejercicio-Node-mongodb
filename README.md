https://markdown.es/sintaxis-markdown/


--- 
---
---
# EJERCICIO-NODE-MONGODB
---
---
---

### Introducción

El objetivo de este proyecto es el desarrollo básico de una API que se ejecutará en el servidor de un servicio de compra-venta de artículos de
segunda mano llamado Nodepop.

Se utilizará Node, express y mongoDB como herramientas base.

El objetivo principal es adquirir un conocimiento básico de dichas herramientas, así como la elaboración de las funcionalidades más habituales de una api de este tipo: listado general de anuncios, listado por diversos filtros, creació y borrado de anuncios, datos devueltos mediante rederización o mediante json, etc.

Todo ello será indicado de manera más pormenorizada en este documento

# DOCUMENTACIÓN

## Instalación y arranque

#### · Requisitos previos:
- Tener instalado en el equipo: 
  - Node
  - Express
  - MongoDB
- Clonado del repositorio en nuestro equipo
  
#### · Instalación de dependencias:

Dentro del directorio:
```sh
mpn install
```
Verificación de que estén instaladas las siguientes herramientas:
  - Express validator
  - Mongoose
  - Nodemon

#### · Inicialización y arranque:

 ·· *Inicialización de la base de datos:*

**¡ATENCIÓN! La ejecución de este comando elimina todo el contenido previo de la BD**. Ha de usarse sólo una vez, en la inicialización de la BD. 

```sh
npm run initDB
```
> **Importante:** se nos pedirá confirmación de inicialización: "s" para aceptar 

Con ello formateamos la BD y cargamos unos datos mínimos para su correcto funcionamiento.  

·· *Arranque aplicación:*
  - Arranque en modo producción: ```npm start```
  - Arranque en modo desarrollo: ```npm run dev```
    
    > En modo desarrollo, ***nodemon*** monitorizará la app y reinicia el servidor automáticamente cuando detecte cambios guardados, para quitarnos esa tarea a nosotros y poder asegurarnos de ejecutar la app con el código más reciente









## GUÍA DE LA API

### Creación de un anuncio
post /api/anuncios (body)

Campos:
  - nombre: string -- Nombre del anuncio
  - venta: boolean -- true venta, false compra
  - precio: number -- en euros con o sin decimales
  - foto: string -- nombre del archivo de imagen  -- opcional
  - tags: [string] --  arrays de tags: work, lifestyle, moto y/o mobile

> Ejemplo de Respuesta, creación anuncio
```json
{
  "result": {
    "nombre": "taburete",
    "venta": true,
    "precio": 30.5,
    "foto": "taburete.png",
    "tags": [
        "lifestyle"
    ],
    "_id": "65e25be995d37146a5c7227f",
    "__v": 0
  }
}
```

### Borrado de un anuncio
delete /api/anuncios/:id

> Ejemplo de Respuesta, borrado anuncio
```json
{
    "estado": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```





