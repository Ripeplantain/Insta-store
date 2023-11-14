import express from 'express';
import config from 'config';
import connectToDb from './helper/database';
import logger from './helper/logger';
import router from './routes'
import client from './helper/redis';


const app = express();

app.use(express.json());
app.use(router);

const port = config.get('port') as number;


app.listen(port, () => {
    logger.info('server started');
    connectToDb();
    client.connect();
});

