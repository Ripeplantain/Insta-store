import express from 'express';
import config from 'config';
import connectToDb from './helper/database';
import logger from './helper/logger';
import router from './routes'
import client from './helper/redis';
import cors from 'cors';
import { generateCartegories, generateProducts, generateVendor } from './helper/faker';


const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(router);

const port = config.get('port') as number;

// generateCartegories();
// generateProducts();
// generateVendor();

app.listen(port, () => {
    logger.info('server started');
    connectToDb();
    client.connect();
});

