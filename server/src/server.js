import express from 'express';
import { env } from './config/environment.js';
import { connectDB } from './config/mongodb.js';

const app = express();

connectDB();

app.get('/', (req, res) => {
    res.end('<h1>hello world</h1>');
})

// @ts-ignore
app.listen(env.PORT, env.HOSTNAME, () => {
    console.log(`Server is running at ${env.HOSTNAME}:${env.PORT}`)
})