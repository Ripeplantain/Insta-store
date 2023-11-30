import { Request, Response } from 'express';
import { cartegoryData } from '../helper/validatre';
import { createCategory, listCartegories, deleteCategory } from '../service/cartegory.service';



// @desc   create category
// @route  POST /api/category
// @access Private
export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const category: any = cartegoryData.parse(req.body);
        const newCategory = await createCategory(category);
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   list categories
// @route  GET /api/category
// @access Private
export const listCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await listCartegories();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   delete category
// @route  DELETE /api/category/:id
// @access Private
export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCategory = await deleteCategory(id);
        return res.status(200).json(deletedCategory);
    } catch (error) {
        return res.status(500).json(error);
    }
}