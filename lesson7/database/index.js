import mongodb from 'mongodb';

const Collections = {}
const connectMongoDb = async () => {
    const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('web73');
    Collections["USERS"] = db.collection("users");
    Collections["TODOS"] = db.collection("todos");
}
export {
    connectMongoDb,
    Collections
}