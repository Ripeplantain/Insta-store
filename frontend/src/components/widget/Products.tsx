import React from "react"
import { useFetchProductsQuery, useFetchProductByIdQuery } from "../../api/product"
import useNotify from "../../hooks/useNotify"
import { useEffect } from "react"
import { ServerError } from "../../helper/types/errorType"
import { Loader } from ".."
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedCartegory } from "../../state/feature/cartegorySlice"
import { setProduct } from "../../state/feature/productSlice"
import { ProductState } from "../../helper/types/stateTypes"
import { ProductCard } from ".."


const Products = () => {

    const selectedCartegory = useSelector(selectSelectedCartegory)
    const { data, error, isLoading } = useFetchProductsQuery(undefined, {})
    const {
        data: productData,
        error: productError,
        isLoading: productIsLoading
    } = useFetchProductByIdQuery(selectedCartegory, { skip: selectedCartegory === null })
    const { ErrorMessage } = useNotify()
    const dispatch = useDispatch()


    useEffect(() => {
        if (error || productError) {
            const errorMessage = error as ServerError
            console.log(errorMessage)
            ErrorMessage(errorMessage.data.message)
        }

        if (data) {
            dispatch(setProduct(data))
        }
    }, [error, ErrorMessage, data, dispatch, productError])

    if (isLoading || productIsLoading) {
        return <Loader />
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className='text-4xl font-roboto text-gray-800'>Products</h1>
            <div className="flex flex-wrap justify-center items-center my-12">
                {productData?.length === 0 && <h1 className='text-2xl font-roboto text-gray-800'>No product found</h1>}

                {!productData ? data?.map((product: ProductState) => (
                    <ProductCard key={product._id} product={product} />
                )) : productData?.map((product: ProductState) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

const MemoizedProducts = React.memo(Products)
export default MemoizedProducts
