import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productSchema } from '../../helper/validation'
import { ProductInput } from '../../helper/types/inputTypes'
import { useSelector } from 'react-redux'
import { selectCartegory } from '../../state/feature/cartegorySlice'
import { Dropzone } from '..'


const ProductForm = () => {

    const cartegories = useSelector(selectCartegory)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(productSchema)
    })
    const onSubmit = (data: ProductInput) => console.log(data)

    return (
        <div>
            <h1 className="font-roboto text-3xl uppercase tracking-wider text-center">
                Add Product
            </h1>

            {/* image form */}
            <Dropzone />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-cyan-500"
                            {...register('name')}
                        />
                        <p className="text-red-500 text-sm">{errors.name?.message}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-cyan-500"
                            {...register('description')}
                        />
                        <p className="text-red-500 text-sm">{errors.description?.message}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            type="number"
                            className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-cyan-500"
                            {...register('price')}
                        />
                        <p className="text-red-500 text-sm">{errors.price?.message}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-cyan-500"
                            {...register('quantity')}
                        />
                        <p className="text-red-500 text-sm">{errors.quantity?.message}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Category</label>
                        <select
                            {...register('category_id')}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            name="cartegory_id" id="cartegory_id">
                            <option value="">Select Cartegory</option>
                            {cartegories.map(cartegory => (
                                <option key={cartegory._id} value={cartegory._id}>{cartegory.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-cyan-500 text-white mt-6 py-2 px-4 rounded-lg hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}

const MemoizedProductForm = React.memo(ProductForm)
export default MemoizedProductForm