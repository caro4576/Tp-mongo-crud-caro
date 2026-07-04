import { getFrutasCollection, closeMongoConnection } from "./mongoClient.js";

// Trae todas las frutas de la coleccion
async function getAllFrutas() {
  const collection = await getFrutasCollection();
  const frutas = await collection.find().toArray();
  await closeMongoConnection();
  return frutas;
}

// Busca una fruta por su id numerico
async function getFrutaById(id) {
  const collection = await getFrutasCollection();
  const fruta = await collection.findOne({ id: Number(id) });
  await closeMongoConnection();
  return fruta;
}

// Busca frutas por nombre o parte del nombre, sin importar mayusculas/minusculas
async function getFrutasByNombre(nombre) {
  const collection = await getFrutasCollection();
  const frutas = await collection
    .find({
      nombre: { $regex: nombre, $options: "i" },
    })
    .toArray();
  await closeMongoConnection();
  return frutas;
}

// Busca frutas con importe mayor o igual al valor recibido
async function getFrutasByImporte(importe) {
  const collection = await getFrutasCollection();
  const frutas = await collection
    .find({
      importe: { $gte: Number(importe) },
    })
    .toArray();
  await closeMongoConnection();
  return frutas;
}

// Agrega una fruta nueva a MongoDB
async function addFruta(fruta) {
  const collection = await getFrutasCollection();
  await collection.insertOne(fruta);
  await closeMongoConnection();
  return fruta;
}

// Actualiza los datos de una fruta existente
async function updateFruta(id, data) {
  const collection = await getFrutasCollection();

  const result = await collection.updateOne({ id: Number(id) }, { $set: data });

  await closeMongoConnection();
  return result;
}

// Elimina una fruta segun su id
async function deleteFruta(id) {
  const collection = await getFrutasCollection();
  const result = await collection.deleteOne({ id: Number(id) });
  await closeMongoConnection();
  return result;
}

export {
  getAllFrutas,
  getFrutaById,
  getFrutasByNombre,
  getFrutasByImporte,
  addFruta,
  updateFruta,
  deleteFruta,
};
