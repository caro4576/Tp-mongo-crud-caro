# CRUD de Frutas con Node.js, Express y MongoDB Atlas

Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB Atlas. Permite realizar un CRUD completo sobre una colección de frutas almacenada en MongoDB.

La base de datos utilizada es:

Base de datos: clase_18  
Colección: frutas

## Tecnologías usadas

- Node.js
- Express
- MongoDB Atlas
- MongoDB Driver
- dotenv
- Thunder Client

## Instalación

Clonar el repositorio:


git clone https://github.com/caro4576/Tp-mongo-crud-caro.git

Entrar a la carpeta del proyecto:
cd Tp-mongo-crud-caro

Instalar dependencias:
npm install

Variables de entorno
Cree un archivo .env en la raíz del proyecto:
MONGO_URL=tu_uri_de_mongodb_atlas
DB_NAME=clase_18

Ejecutar el servidor
npm run dev
Si todo funciona correctamente, el servidor queda disponible en:
http://localhost:3000

Probar con Thunder Client
Abrir Thunder Client en VS Code y crear nuevas peticiones usando las siguientes rutas.
Endpoints
Verificar servidor
GET http://localhost:3000/health
Respuesta esperada:
{
  "status": "ok",
  "timestamp": "..."
}

Obtener todas las frutas
GET http://localhost:3000/frutas
Obtener una fruta por id
GET http://localhost:3000/frutas/1
Buscar frutas por nombre
GET http://localhost:3000/frutas/nombre/banana
La búsqueda no distingue entre mayúsculas y minúsculas.
Buscar frutas por importe
GET http://localhost:3000/frutas/importe/3000
Devuelve frutas cuyo importe sea mayor o igual al valor indicado.

Crear una fruta
POST http://localhost:3000/frutas
En Thunder Client:
Seleccionar método POST.
Ir a la pestaña Body.
Elegir JSON.
Pegar un cuerpo como este:
{
  "id": 99,
  "imagen": "🍓",
  "nombre": "Frutilla",
  "importe": 4500,
  "stock": 80
}
Respuesta esperada: 201 Created.
Modificar una fruta
PUT http://localhost:3000/frutas/99
Body JSON:
{
  "imagen": "🍓",
  "nombre": "Frutilla actualizada",
  "importe": 5000,
  "stock": 60
}
Respuesta esperada: 200 OK.

Eliminar una fruta
DELETE http://localhost:3000/frutas/99
Respuesta esperada: 204 No Content.
Códigos de respuesta usados
200 OK: la petición se resolvió correctamente.
201 Created: se creó una fruta nueva.
204 No Content: se eliminó correctamente.
400 Bad Request: faltan datos o algún dato tiene formato incorrecto.
404 Not Found: no se encontró la fruta o la ruta solicitada.
500 Internal Server Error: error interno del servidor.

src/
├── db/
│   ├── mongoClient.js
│   └── frutasStore.js
└── routes/
    ├── health.js
    └── frutas.js

    Thunder Client
    ↓
Servidor Express
    ↓
Rutas de frutas
    ↓
Funciones de frutasStore
    ↓
MongoDB Atlas


El archivo frutas.js define las rutas de la API.
El archivo frutasStore.js contiene las operaciones contra MongoDB.
El archivo mongoClient.js se encarga de conectar con MongoDB Atlas usando las variables del archivo .env.


CRUD implementado
Create -> POST /frutas
Read   -> GET /frutas, GET /frutas/:id
Update -> PUT /frutas/:id
Delete -> DELETE /frutas/:id

Esta sección resume los pasos principales para instalar el proyecto, configurar MongoDB Atlas y probar los endpoints desde Thunder Client.(mi machete)