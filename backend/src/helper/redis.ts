import logger from "./logger";
import * as redis from "redis";



const client: any = redis.createClient();

client.on("error", (err: any) => {
    logger.error(err);
});

client.on("connect", () => {
    logger.info("Redis connected");
});

export default client;