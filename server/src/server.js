import express from 'express';
import { env } from './config/environment.js';
import { connectDB } from './config/mongodb.js';
import { BoardModel } from './models/board.model.js';
import { api } from './routes/index.js';

connectDB()
.then(() => console.log("Database connected successfully!"))
.then(() => boostServer())
.catch(error => {
    console.log(error)
    process.exit(1)
});

const boostServer = () => {
    const app = express();
    
    app.use(express.json())
    
    app.use('/api', api);

    app.get('/test', async (req, res) => {
        let mock = { 
            title: "First board",

        }

        await BoardModel.createNew(mock);

    })
    
    // @ts-ignore
    app.listen(env.PORT, env.HOSTNAME, () => {
        console.log(`Server is running at ${env.HOSTNAME}:${env.PORT}`)
    })
}
