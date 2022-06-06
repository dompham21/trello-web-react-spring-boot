import { MongoClient } from 'mongodb'
import { env } from './environment.js';

let dbInstance = null;
const uri = env.MONGODB_URI


export const connectDB = async () => {

    const client = new MongoClient(uri, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    await client.connect();

    dbInstance = client.db(env.DB_NAME)

    
}

export const getDB = () => {
    if(!dbInstance) throw new Error("Must connect to Database firtst!");
    return dbInstance;
}
