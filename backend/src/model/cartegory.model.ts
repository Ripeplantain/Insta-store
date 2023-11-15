import mongoose from "mongoose";



const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now},
})

const Category = mongoose.model("Category", CategorySchema);
export default Category;