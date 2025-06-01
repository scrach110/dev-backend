import { MongoClient } from 'mongodb';

const dbName = process.env.DB_NAME;
const mongoURL: string = String(process.env.DB_URL);
const client = new MongoClient(mongoURL);
const conection = false;

export const MongoConection = async () => {
    if (!conection) {
        try {
            await client.connect();
        } catch {
            throw new Error('error con la base de mongodb');
        }
    }
    return client.db(dbName);
};
