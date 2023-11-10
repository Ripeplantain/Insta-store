import express from 'express';
import config from 'config';
import connectToDb from './helper/database';
import logger from './helper/logger';


const app = express();

app.use(express.json());

const port = config.get('port') as number;

app.listen(port, () => {
    logger.info('server started');
    connectToDb();
});