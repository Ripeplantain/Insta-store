import mongoose from "mongoose";
import config from "config";
import logger from "./logger";


const connectToDb = async () => {

    const url = config.get('dbUrl') as string;

    try {
        await mongoose.connect(url)
        logger.info('connected to db')
    } catch(error) {
        logger.error('could not connect to db')
        process.exit(1)
    }
}

export default connectToDb;