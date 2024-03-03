
--- NOTA:

Hola, Javier.

Aprovecho el documento para un comentarios:

- Las validaciones creo que las he hecho bastante completas. No sabía hasta que punto teníamos que extenderlas más. Creo que cubro los aspectos importantes y he manejado varias, incluida alguna custom. Espero que sean suficientes.

---
---
# <center>EJERCICIO-NODE-MONGODB</center>
---
---

>David Arrarás López

### Introducción

El objetivo de este proyecto es el desarrollo básico de una API que se ejecutará en el servidor de un servicio de compra-venta de artículos de
segunda mano llamado Nodepop.

Se utilizará Node, express y mongoDB como herramientas base.

El objetivo principal es adquirir un conocimiento básico de dichas herramientas, así como la elaboración de las funcionalidades más habituales de una api de este tipo: listado general de anuncios, listado por diversos filtros, creación y borrado de anuncios, datos devueltos mediante rederización o mediante json, etc.

Concretamente, lo que debe poder realizarse con la API sería:
  - Obtener listado de anuncios:
    - Listado general
    - Listado de un anuncio concreto (por medio de su id)
  - Lista de anuncios por filtro:
    - Opciones de filtrado, que pueden usarse individualmente o en grupo:
      - Filtros por tag
      - Filtros por tipo de anuncio (venta/compra)
      -  Filtros por rango de precio 
      - Filtro por nombre: se muestran los anuncios que empiecen por dicho nombre
      - Filtro de ordenación por el campo que indiquemos
  - Lista de tags existentes
  - Posibilidad de paginación en el listado de la información
  - Creación de un anuncio
  - Borrado de un anuncio

# <br><center>DOCUMENTACIÓN</center>

## Instalación y arranque

#### · Requisitos previos:
- Tener instalado en el equipo: 
  - Node
  - Express
  - MongoDB
  - Postman (para la simulación de peticiones post, delete, etc.)
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

## <br>GUÍA DE LA API

### ACCESO
- Acceso a la API usando el navegador, con la información de respuesta en formato Json.
  - ``` http://localhost:3000/api/anuncios``` 
- Acceso directamente a Nodepop por medio del navegador, siendo la información de respuesta renderizada en una vista.
  - ``` http://localhost:3000/``` 

La documentación se centrará en el API, y se mostrará los ejemplos de respuesta en formato Json. El acceso a Nodepop se realiza de igual manera, pero variando la url de acceso como se indica arriba.


### PETICIONES

### Obtener anuncio concreto

GET /api/anuncios/:id

Se obtiene un listado del anuncio con la id indicada

### Obtener anuncios

GET /api/anuncios

Se obtiene un listado general de todos los anuncios

### Obtener anuncios (con filtros)

GET /api/anuncios/?

Se obtiene un listado de los anuncios que cumplen el filtro indicado

- Filtros:
  - **nombre**: muestra los anuncios que empiezan por la cadena indicada
    - ```http://localhost:3000/api/anuncios?nombre=silla```
  - **venta**: indica si se vende (true) o si se compra(false) el articulo del anuncio
    - ```http://localhost:3000/api/anuncios?venta=true```
  - **sort**: el campo por el que se ordenarán los anuncios:
    - ```http://localhost:3000/api/anuncios?sort=precio```
  - **tag**: campo de agrupación de anuncios -> work, motor, mobile y lifestyle
    - Puede filtrarse por varios, añadiendo un tag por campo
    - ```http://localhost:3000/api/anuncios?tag=mobile&tag=motor```
  - **Precio**: rango de precios. Formato numérico.
    - precio=50 -> aquellos productos que valen exactamente 50€
    - precio=-50 -> aquellos productos hasta 50€
    - precio=50- -> aquellos productos de 50€ en adelante
    - precio=50-100 -> aquellos productos situados en un rango de 50 a 100 €
    - ```http://localhost:3000/api/anuncios?precio:50-100```
  - **skip** **limit**: paginación del resultado. Datos numéricos. Skip indica el número de anuncios que ha de saltarse. Limit el máximo que mostrará
    - ``` http://localhost:3000/api/anuncios?skip=0&limit=5``` 
    - Muestra desde el inicio hasta el 5º anuncio

  - Ejemplo: ```http://localhost:3000/api/anuncios?skip=0&limit=5&tag=mobile&precio=10-200&sort=precio```
  - Respuesta:
    ```json
    {
      "resultado": [
          {
              "_id": "65e31e89d916977beff352be",
              "nombre": "funda movil",
              "venta": false,
              "precio": 10,
              "foto": "funda.png",
              "tags": [
                  "lifestyle",
                  "mobile"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c3",
              "nombre": "soporte movil",
              "venta": true,
              "precio": 35,
              "foto": "soporte.png",
              "tags": [
                  "mobile",
                  "motor"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c4",
              "nombre": "pantalla iphone",
              "venta": false,
              "precio": 90,
              "foto": "pantalla.png",
              "tags": [
                  "mobile"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c6",
              "nombre": "apple pencil",
              "venta": true,
              "precio": 99.99,
              "foto": "pencil.png",
              "tags": [
                  "mobile"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c0",
              "nombre": "samsung a52",
              "venta": true,
              "precio": 190,
              "foto": "a52.png",
              "tags": [
                  "mobile"
              ],
              "__v": 0
          }
      ]
    }

### Obtener tags
GET /api/anuncios/tags

Devuelve el listado de tags que hay en la BD

  - ```http://localhost:3000/api/anuncios/tags```
  - Respuesta:
    ```json
    {
      "result": [
          "lifestyle",
          "mobile",
          "motor",
          "work"
      ]
    }
    ```


### Creación de un anuncio
post /api/anuncios (body)

La petición post se hace por medio de Postman.

- Pestaña body de la aplicación -> marcarmos x-www-form-urlencoded
- POST url ```127.0.0.1:3000/api/anuncios/```
- Campos:
  - nombre: string -- Nombre del anuncio
  - venta: boolean -- true venta, false compra
  - precio: number -- en euros con o sin decimales
  - foto: string -- nombre del archivo de imagen  -- opcional
  - tags: [string] --  arrays de tags: work, lifestyle, moto y/o mobile

- Respuesta
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

La petición post se hace por medio de Postman.


- DELETE url ```127.0.0.1:3000/api/anuncios/65e4ce5661ed9743c551d499```
- Respuesta
```json
{
    "estado": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```


## Opciones de desarrollo futuro

Algunas propuestas:

- Control de mayúsculas/minúsculas en el manejo de los datos de los anuncios
- Mejora visual de las vistas en la parte frontend
- Ampliación de uso de ESLint (instalado pero no utilizado a fondo en la actualidad).
- Realizar documentación con aplicaciones especializadas como Swagger o similar



