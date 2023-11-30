import mongodb from 'mongodb';
const mongodbClient = new mongodb.MongoClient("mongodb+srv://admin:admin@web73.nqghkto.mongodb.net/?retryWrites=true&w=majority")

const Collections = {

}
const connectMongoDb = async () => {
    await mongodbClient.connect();
    Collections["USERS"] = mongodbClient.db('app-basic').collection('users')
}
export {
    connectMongoDb,
    Collections
}