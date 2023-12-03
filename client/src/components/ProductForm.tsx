import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "../helpers/validation"
import { ProductType } from "../helpers/types/form"
import { useSelector } from "react-redux"
import { selectData } from "../state/features/cartegorySlice"
import DropZone from "./DropZone"



const ProductForm = () => {

    const cartegories = useSelector(selectData)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(productSchema)
    })

    const onSubmit: SubmitHandler<ProductType> = async (data) => console.log(data)


    return (
        <div>
            <h1 className="font-roboto text-3xl uppercase tracking-wider">Product Form</h1>

            {/* Upload Image */}
            <DropZone />

            <div className="my-8">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id="name"
                            {...register("name")}
                            className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        <p>{errors.name?.message}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            {...register("description")}
                            className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            name="description" id="description"></textarea>
                        {errors.description?.message}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            {...register("price")}
                            className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        {errors.price?.message}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            id="quantity"
                            {...register("quantity")}
                            className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        {errors.quantity?.message}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="cartegory_id">Cartegory</label>
                        <select
                            {...register("cartegory_id")}
                            className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            name="cartegory_id" id="cartegory_id">
                            {cartegories.map(cartegory => (
                                <option key={cartegory._id} value={cartegory._id}>{cartegory.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="bg-black hover:bg-gray-500 text-white rounded-md p-3 mt-2 
                            focus:outline-none focus:ring-2 focus:ring-primary/50"
                        type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
