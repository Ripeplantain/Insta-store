import React, { useEffect} from 'react'
import { useFetchCarteogroriesQuery } from '../../api/cartegory'
import { Loader } from '..'
import useNotify from '../../hooks/useNotify'
import { ServerError } from '../../helper/types/errorType'
import { CartegoryState } from '../../helper/types/stateTypes'
import { useDispatch } from 'react-redux'
import { setCartegory } from '../../state/feature/cartegorySlice'


const Cartegories = () => {

    const dispatch = useDispatch()
    const { ErrorMessage } = useNotify()
    const { data, error, isLoading } = useFetchCarteogroriesQuery( undefined, {})

    useEffect(() => {
        if (error) {
            const errorMessage = error as ServerError
            ErrorMessage(errorMessage.data.message)
        }

        if (data) {
            dispatch(setCartegory(data))
        }
    }, [error, ErrorMessage, data, dispatch])

    if (isLoading) {
        return <Loader />
    }


    return (
        <section
            className='flex flex-col justify-center items-center my-16'>
            <h1 className='text-4xl font-roboto text-gray-700'>Cartegories</h1>
            <div className='flex flex-wrap justify-center items-center my-8'>
                {data?.map((cartegory: CartegoryState) => (
                    <div
                        key={cartegory._id}
                        className='flex flex-col justify-center items-center m-4 bg-slate-200 hover:bg-black cursor-pointer hover:text-white delay-100 ease p-4'>
                        <h1 className='text-lg font-roboto'>{cartegory.name}</h1>
                    </div>
                ))}
            </div>
        </section>
    )
}


const MemoizedCartegories = React.memo(Cartegories)
export default MemoizedCartegories
