import React, { useEffect } from 'react'
import { useFetchCarteogroriesQuery } from '../../api/cartegory'
import { Loader } from '..'
import useNotify from '../../hooks/useNotify'
import { ServerError } from '../../helper/types/errorType'
import { CartegoryState } from '../../helper/types/stateTypes'
import { useDispatch } from 'react-redux'
import { setCartegory, setSelectedCartegory } from '../../state/feature/cartegorySlice'
import { setSearchProduct } from '../../state/feature/productSlice'


const Cartegories = () => {

    const dispatch = useDispatch()
    const { ErrorMessage } = useNotify()
    const { data, error, isLoading } = useFetchCarteogroriesQuery( undefined, {})

    const handleClick = (cartegoryId: string) => {
        dispatch(setSelectedCartegory(cartegoryId))
        dispatch(setSearchProduct(null))
    }

    useEffect(() => {
        if (error ) {
            const errorMessage = error as ServerError
            ErrorMessage(errorMessage.data.message)
        }

        if (data) {
            dispatch(setCartegory(data))
        }


    }, [error, ErrorMessage, data, dispatch])

    if (isLoading ) {
        return <Loader />
    }


    return (
        <section
            className='flex flex-col justify-center items-center my-20'>
            <h1 className='text-4xl font-roboto text-gray-800'>Cartegories</h1>
            <div className='flex flex-wrap justify-center items-center my-8'>
                {data?.map((cartegory: CartegoryState) => (
                    <div
                        onClick={() => handleClick(cartegory._id)}
                        key={cartegory._id}
                        className='flex flex-col justify-center items-center m-4 border-2 border-gray-800 rounded-3xl hover:bg-black cursor-pointer hover:text-white delay-100 ease-in-out p-4'>
                        <h1 className='text-lg font-roboto'>{cartegory.name}</h1>
                    </div>
                ))}
            </div>
        </section>
    )
}


const MemoizedCartegories = React.memo(Cartegories)
export default MemoizedCartegories
