import React from "react"
import { useFetchProductsQuery, useFetchProductByIdQuery, useSearchProductQuery } from "../../api/product"
import useNotify from "../../hooks/useNotify"
import { useEffect } from "react"
import { ServerError } from "../../helper/types/errorType"
import { Loader } from ".."
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedCartegory } from "../../state/feature/cartegorySlice"
import { setProduct, selectSearchedProduct } from "../../state/feature/productSlice"
import { ProductCard } from ".."


const Products = () => {

    const selectedCartegory = useSelector(selectSelectedCartegory)
    const searchedProduct = useSelector(selectSearchedProduct)
    const { data, error, isLoading } = useFetchProductsQuery(undefined, {})
    const {
        data: productData,
        error: productError,
        isLoading: productIsLoading
    } = useFetchProductByIdQuery(selectedCartegory, { skip: selectedCartegory === null })
    const { data: searchData } = useSearchProductQuery(searchedProduct, { skip: searchedProduct === '' })
    const { ErrorMessage } = useNotify()
    const dispatch = useDispatch()

    useEffect(() => {
        if (error || productError) {
            const errorMessage = error as ServerError
            ErrorMessage(errorMessage.data.message)
        }

        if (data) {
            dispatch(setProduct(data))
        }
    }, [error, ErrorMessage, data, dispatch, productError])

    if (isLoading || productIsLoading) {
        return <Loader />
    }

    if (searchData && searchData.length > 0) {
        return (
            <section className="flex flex-col justify-center items-center">
                <h1 className='text-4xl font-roboto text-gray-800'>Products</h1>
                <div className="flex flex-wrap justify-center items-center my-12">
                    {searchData.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        )
    }

    if (productData && productData.length > 0) {
        return (
            <section className="flex flex-col justify-center items-center">
                <h1 className='text-4xl font-roboto text-gray-800'>Products</h1>
                <div className="flex flex-wrap justify-center items-center my-12">
                    {productData.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        )
    }



    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className='text-4xl font-roboto text-gray-800'>Products</h1>
            <div className="flex flex-wrap justify-center items-center my-12">
                {data?.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

const MemoizedProducts = React.memo(Products)
export default MemoizedProducts
