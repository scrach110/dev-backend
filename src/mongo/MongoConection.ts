import { MongoClient } from 'mongodb';

const dbName = process.env.DB_NAME;
const mongoURL: string = String(process.env.DB_URL);
const client = new MongoClient(mongoURL);
const conection = false;

export const MongoConection = async () => {
    if (!conection) {
        await client.connect();
    }
    return client.db(dbName);
};
