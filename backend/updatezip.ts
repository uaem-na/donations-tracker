import { Db, MongoClient, ObjectId } from "mongodb";

const DEFAULT_CONNECTION_STRING = "mongodb://127.0.0.1:27017/dev";

async function updateZipCodes(connectionString: string) {
  const client = new MongoClient(connectionString);

  try {
    client.connect();

    const database = client.db("dev");
    await updateCollection(database, "users");
    await updateCollection(database, "posts");

    console.log("Zip codes within location field updated successfully!");
  } finally {
    await client.close();
  }
}

async function updateCollection(database: Db, collectionName: string) {
  const collection = database.collection(collectionName);
  const documents = await collection.find().toArray();

  for (const document of documents) {
    const location = document.location;
    if (location) {
      // Update the zip code within the "location" field
      location.postalCode = updateZipCodeFormat(location.postalCode);

      // Update the document in the collection
      await collection.updateOne(
        { _id: new ObjectId(document._id) },
        { $set: { location } }
      );
    }
  }
}

function updateZipCodeFormat(currentZipCode: string): string {
  return currentZipCode.replace(/ /g, "").toUpperCase();
}

updateZipCodes(DEFAULT_CONNECTION_STRING);
