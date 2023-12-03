import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import logger from "../helper/logger";



// @desc   Upload file
// @route  POST /api/file
// @access Private
export const uploadFileController = async (req: any, res: Response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No files were uploaded." });
        }

        const file = req.files.file as any;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        
        })

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath);

        return res.json({ url: result.secure_url });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
}