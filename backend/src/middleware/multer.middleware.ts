import multer from 'multer';
import path from 'path';
import dayjs from 'dayjs';
import {v4 as uuidv4 } from 'uuid'

const currentDate = dayjs(Date.now()).format('YYYY-MM-DD');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, currentDate + '-' + uuidv4().slice(1,12) + ext);
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" || 
            file.mimetype == "image/jpeg"
            ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});