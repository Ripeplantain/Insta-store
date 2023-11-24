import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchAsyncProducts, selectData, selectIsLoading, selectError } from "../state/features/productSlice"
import useFlashMessages from "../hooks/useFlashMessages"
import { RotatingLines } from "react-loader-spinner"
import { Default } from "../assets/image"
import { addToCart } from "../state/features/cartSlice"


const Products = () => {

    const dispatch = useDispatch()
    const products = useSelector(selectData)
    const isLoading = useSelector(selectIsLoading)
    const error = useSelector(selectError)
    const { showErrorMessage } = useFlashMessages()

    useEffect(() => {
        dispatch(fetchAsyncProducts())
    }, [dispatch])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }

    if (error) {
        showErrorMessage(error)
    }

    return (
        <section className="my-12">
            <div className="flex flex-col items-center gap-4 my-12">
                <h1 className="text-center font-playfair text-[60px] mt-6 uppercase">
                    Products</h1>
                <span className="text-center font-playfair text-sm text-gray-700">
                    Find something with us</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 p-6">
                {products.map((product, index) => (
                    <div
                        className="mb-6 flex flex-col justify-center items-center gap-2 w-64 h-96 bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-300"
                        key={index}>
                        <img
                            className="w-full h-3/4 object-cover rounded-t-md"
                            src={Default}
                            alt="product"
                        />
                        <div className="flex flex-col justify-center items-center gap-2 p-2">
                            <h1 className="font-playfair text-xl">{product.name}</h1>
                            {/* <p className="font-roboto text-sm">{product.description}</p> */}
                            <h1 className="font-playfair text-xl">${product.price}</h1>
                        </div>
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="bg-black text-white px-6 py-3 rounded-md mt-6 hover:scale-90">
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    ) 
}

export default Products
