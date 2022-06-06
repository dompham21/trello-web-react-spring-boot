import { MongoClient } from 'mongodb'
import { env } from './environment.js';

const uri = env.MONGODB_URI


export const connectDB = async () => {

    const client = new MongoClient(uri, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    try {
        await client.connect();

        await listDatabases(client);
        console.log("Database connected successfully!")
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.close();
    }
}

const listDatabases = async (client) => {
    const databases = await client.db().admin().listDatabases();
    console.log(databases);
}