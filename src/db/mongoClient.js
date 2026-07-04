// Conexion a MongoDB Atlas
import { MongoClient } from "mongodb";

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(MONGO_URL);

// Devuelve la coleccion frutas de la base indicada en el .env
export async function getFrutasCollection() {
  await client.connect();
  const db = client.db(DB_NAME);
  return db.collection("frutas");
}

// Cierra la conexion despues de cada operacion
export async function closeMongoConnection() {
  await client.close();
}
