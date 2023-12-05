import React from "react"
import { FormEvent, useState } from "react"
import { useSelector } from "react-redux"
import { selectData } from "../state/features/cartegorySlice"
import { DropZone } from "./DropZone"
import { useCreateProductMutation } from "../services/product"


const ProductForm = () => {

    const [ fromData, setFormData ] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        picture: '',
        cartegory_id: ''
    })
    const cartegories = useSelector(selectData)
    const [createProduct, { isLoading, isError}] = useCreateProductMutation()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(fromData)
        const response = await createProduct(fromData)
        console.log(response)
        // dispatch(postAsyncProduct(fromData))
    }

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error...</div>

    return (
        <div>
            <h1 className="font-roboto text-3xl uppercase tracking-wider">Product Form</h1>
            <DropZone setFilePath={(filePath) => setFormData({...fromData, picture: filePath})}/>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col gap-2"> 
                        <label htmlFor="name">Product Name</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            id="name"
                            name="name"
                            value={fromData.name}
                            onChange={(e) => setFormData({...fromData, name: e.target.value})}
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Product Description</label>
                        <textarea
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            id="description"
                            name="description"
                            value={fromData.description}
                            onChange={(e) => setFormData({...fromData, description: e.target.value})}
                            rows={5} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price">Product Price</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            id="price"
                            name="price"
                            value={fromData.price}
                            onChange={(e) => setFormData({...fromData, price: e.target.value})}
                            type="number" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="quantity">Product Quantity</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            id="quantity"
                            name="quantity"
                            value={fromData.quantity}
                            onChange={(e) => setFormData({...fromData, quantity: e.target.value})}
                            type="number" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cartegory">Cartegory</label>
                        <select
                            onChange={(e) => setFormData({...fromData, cartegory_id: e.target.value})}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            name="cartegory_id" id="cartegory_id">
                            <option value="">Select Cartegory</option>
                            {cartegories.map(cartegory => (
                                <option key={cartegory._id} value={cartegory._id}>{cartegory.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="bg-black hover:bg-gray-500 text-white rounded-md p-3 mt-2 
                                    focus:outline-none focus:ring-2 focus:ring-primary/50"
                        type="submit">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}

// export default ProductForm
const MemoizedProductForm = React.memo(ProductForm)
export { MemoizedProductForm as ProductForm }
