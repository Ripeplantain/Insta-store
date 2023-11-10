import pino from 'pino';
import dayjs from 'dayjs';


const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            levelFirst: true,
            translateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
    }
})

export default logger;