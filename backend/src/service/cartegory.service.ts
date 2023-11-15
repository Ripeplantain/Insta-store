import Category from "../model/cartegory.model";


interface Category {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}


export const createCategory = async (category: Category) => {
    const newCategory = new Category(category);
    return await newCategory.save();
}

export const listCartegories = async () => {
    return await Category.find();
}

export const deleteCategory = async (id: string) => {
    return await Category.findByIdAndDelete(id);
}