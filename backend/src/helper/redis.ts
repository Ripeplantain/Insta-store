import logger from "./logger";
import * as redis from "redis";



const client = redis.createClient();

client.on("error", (err) => {
    logger.error(err);
});

client.on("connect", () => {
    logger.info("Redis connected");
});

export default client;