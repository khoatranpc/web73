import mongodb from 'mongodb';

const Collections = {};

const connectDb = async () => {
    const client = new mongodb.MongoClient('mongodb+srv://mindx:mindx@test-demployment.gzmrvrg.mongodb.net/?retryWrites=true&w=majority');
    await client.connect();
    const db = client.db('web73');
    Collections['ACCOUNTS'] = db.collection('accounts');
    Collections['USERS'] = db.collection('users');
}

export {
    Collections,
    connectDb
}