import mongodb from 'mongodb';

const Collections = {};

const connectDb = async () => {
    const client = new mongodb.MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('web73');
    Collections['ACCOUNTS'] = db.collection('accounts');
    Collections['USERS'] = db.collection('users');
}

export {
    Collections,
    connectDb
}

