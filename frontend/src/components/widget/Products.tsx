import React from "react"
import { useFetchProductsQuery } from "../../api/product"
import useNotify from "../../hooks/useNotify"
import { useEffect } from "react"
import { ServerError } from "../../helper/types/errorType"
import { Loader } from ".."
import { useDispatch } from "react-redux"
import { setProduct } from "../../state/feature/productSlice"
import { ProductState } from "../../helper/types/stateTypes"
import { ProductCard } from ".."


const Products = () => {

    const { data, error, isLoading } = useFetchProductsQuery(undefined, {})
    const { ErrorMessage } = useNotify()
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            const errorMessage = error as ServerError
            console.log(errorMessage)
            ErrorMessage(errorMessage.data.message)
        }

        if (data) {
            dispatch(setProduct(data))
        }
    }, [error, ErrorMessage, data, dispatch])

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className='text-4xl font-roboto text-gray-800'>Products</h1>
            <div className="flex flex-wrap justify-center items-center my-12">
                {data?.map((product: ProductState) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

const MemoizedProducts = React.memo(Products)
export default MemoizedProducts
