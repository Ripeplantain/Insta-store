import express from 'express';
import config from 'config';
import connectToDb from './helper/database';
import logger from './helper/logger';
import router from './routes'
import client from './helper/redis';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(router);

const port = config.get('port') as number;


app.listen(port, () => {
    logger.info('server started');
    connectToDb();
    client.connect();
});

