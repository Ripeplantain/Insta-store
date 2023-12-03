import { Response, Request } from "express";
import { vendorData } from "../helper/validatre";
import { createVendor, listVendors, deleteVendor, updateVendor, getVendor,
            getUserVendor} from "../service/vendor.service";
import { updateVendorField, findUserById } from "../service/user.service";
import { getProductByVendor } from "../service/product.service";


// @desc   create vendor
// @route  POST /api/vendor
// @access Private
export const createVendorController = async (req: any, res: Response) => {
    try {
        const user = await findUserById(req.payload.id);
        if(user && user.role === 'vendor'){
            return res.status(400).json({
                message: 'You are already a vendor',
            });
        } else if(user && user.role === 'admin'){
            return res.status(400).json({
                message: 'You can not be a vendor',
            });
        }
        const vendor: any = vendorData.parse(req.body);
        vendor.user = user?._id;
        const newVendor = await createVendor(vendor);
        if(newVendor){
            await updateVendorField(req.payload.id, 'role', 'vendor');
        }
        return res.status(201).json(newVendor);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   list vendors
// @route  GET /api/vendor
// @access Private
export const listVendorsController = async (req: Request, res: Response) => {
    try {
        const vendors = await listVendors();
        return res.status(200).json(vendors);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   delete vendor
// @route  DELETE /api/vendor/:id
// @access Private
export const deleteVendorController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteVendor(id);
        return res.status(200).json({
            message: 'Vendor deleted successfully',
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   update vendor
// @route  PUT /api/vendor/:id
// @access Private
export const updateVendorController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vendor: any = vendorData.parse(req.body);
        const updatedVendor = await updateVendor(id, vendor);
        return res.status(200).json({
            message: 'Vendor updated successfully',
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   get vendor
// @route  GET /api/vendor/:id
// @access Private
export const getVendorController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vendor = await getVendor(id);
        return res.status(200).json(vendor);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   get vendor
// @route GET /api/vendor/me/:id
// @access Private
export const getUserVendorController = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const vendor = await getUserVendor(id);
        const vendorProducts = await getProductByVendor(vendor?._id);
        if(!vendor) return res.status(404).json({
            message: 'Vendor not found',
        });
        return res.status(200).json({vendor, vendorProducts});
    } catch (error) {
        return res.status(500).json(error);
    }
}