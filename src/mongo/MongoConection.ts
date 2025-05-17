import { MongoClient } from 'mongodb';
import Persona from '../interfaces/Persona';

const dbName = process.env.DB_NAME;
const mongoURL = process.env.DB_URL;
const client = new MongoClient(mongoURL);
const conection = false;

export const MongoConection = async (collection: string) => {
    if (!conection) {
        await client.connect();
    }
    return client.db(dbName).collection<Persona>(collection);
};
