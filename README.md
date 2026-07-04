Sí, te lo dejo completo y prolijo en **un solo bloque**. Copiá todo esto y reemplazá el contenido de `README.md`:

```md
# CRUD de Frutas con Node.js, Express y MongoDB Atlas

Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB Atlas. Permite realizar un CRUD completo sobre una colección de frutas almacenada en MongoDB.

La base de datos utilizada es:

```text
Base de datos: clase_18
Colección: frutas
```

## Tecnologías usadas

- Node.js
- Express
- MongoDB Atlas
- MongoDB Driver
- dotenv
- Thunder Client

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/caro4576/Tp-mongo-crud-caro.git
```

Entrar a la carpeta del proyecto:

```bash
cd Tp-mongo-crud-caro
```

Instalar dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
MONGO_URL=tu_uri_de_mongodb_atlas
DB_NAME=clase_18
```

Ejemplo:

```env
MONGO_URL=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/?appName=Cluster0
DB_NAME=clase_18
```

Importante: el archivo `.env` no debe subirse al repositorio.

El archivo `.gitignore` debe incluir:

```gitignore
node_modules
.env
```

## Ejecutar el servidor

```bash
npm run dev
```

Si todo funciona correctamente, el servidor queda disponible en:

```text
http://localhost:3000
```

## Probar con Thunder Client

Abrir Thunder Client en VS Code y crear nuevas peticiones usando las siguientes rutas.

## Endpoints

### Verificar servidor

```http
GET http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "timestamp": "..."
}
```

### Obtener todas las frutas

```http
GET http://localhost:3000/frutas
```

### Obtener una fruta por id

```http
GET http://localhost:3000/frutas/1
```

### Buscar frutas por nombre

```http
GET http://localhost:3000/frutas/nombre/banana
```

La búsqueda no distingue entre mayúsculas y minúsculas.

### Buscar frutas por importe

```http
GET http://localhost:3000/frutas/importe/3000
```

Devuelve frutas cuyo importe sea mayor o igual al valor indicado.

## Crear una fruta

```http
POST http://localhost:3000/frutas
```

En Thunder Client:

1. Seleccionar método `POST`.
2. Ir a la pestaña `Body`.
3. Elegir `JSON`.
4. Pegar un cuerpo como este:

```json
{
  "id": 99,
  "imagen": "🍓",
  "nombre": "Frutilla",
  "importe": 4500,
  "stock": 80
}
```

Respuesta esperada: `201 Created`.

## Modificar una fruta

```http
PUT http://localhost:3000/frutas/99
```

Body JSON:

```json
{
  "imagen": "🍓",
  "nombre": "Frutilla actualizada",
  "importe": 5000,
  "stock": 60
}
```

Respuesta esperada: `200 OK`.

## Eliminar una fruta

```http
DELETE http://localhost:3000/frutas/99
```

Respuesta esperada: `204 No Content`.

## Códigos de respuesta usados

- `200 OK`: la petición se resolvió correctamente.
- `201 Created`: se creó una fruta nueva.
- `204 No Content`: se eliminó correctamente.
- `400 Bad Request`: faltan datos o algún dato tiene formato incorrecto.
- `404 Not Found`: no se encontró la fruta o la ruta solicitada.
- `500 Internal Server Error`: error interno del servidor.

## Estructura principal

```text
src/
├── db/
│   ├── mongoClient.js
│   └── frutasStore.js
└── routes/
    ├── health.js
    └── frutas.js
```

## Funcionamiento general

El flujo de la aplicación es:

```text
Thunder Client
    ↓
Servidor Express
    ↓
Rutas de frutas
    ↓
Funciones de frutasStore
    ↓
MongoDB Atlas
```

El archivo `frutas.js` define las rutas de la API.  
El archivo `frutasStore.js` contiene las operaciones contra MongoDB.  
El archivo `mongoClient.js` se encarga de conectar con MongoDB Atlas usando las variables del archivo `.env`.

## CRUD implementado

```text
Create -> POST /frutas
Read   -> GET /frutas, GET /frutas/:id
Update -> PUT /frutas/:id
Delete -> DELETE /frutas/:id
```

## Uso del proyecto

Esta sección resume los pasos principales para instalar el proyecto, configurar MongoDB Atlas y probar los endpoints desde Thunder Client.
```

Después guardás, commit y push:

```bash
git add README.md
git commit -m "Actualiza README"
git push
```