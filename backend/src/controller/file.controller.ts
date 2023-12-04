import { Request, Response } from "express";
import logger from "../helper/logger";



// @desc   Upload file
// @route  POST /api/file
// @access Private
export const uploadFileController = async (req: any, res: Response) => {
    try {
        if(!req.file){
            return res.status(400).json({
                message: "Upload file failed",
            });
        }
        res.status(200).json({
            message: "Upload file successfully",
            data: req.file.path
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            message: "Upload file failed",
        });
    }
}