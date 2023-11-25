import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncCartegories, selectData,
        selectisLoading, selectError} from '../state/features/cartegorySlice' 
import { fetchAsyncByCartegory } from '../state/features/productSlice'
import { RotatingLines } from 'react-loader-spinner'
import useFlashMessages from '../hooks/useFlashMessages'


const Cartegory = () => {

    const dispatch = useDispatch()
    const cartegories = useSelector(selectData)
    const isLoading = useSelector(selectisLoading)
    const error = useSelector(selectError)
    const { showErrorMessage } = useFlashMessages()


    useEffect(() => {
        dispatch(fetchAsyncCartegories())
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
        <section>
            <div 
                className='flex w-full bg-black text-white p-6 overflow-auto gap-32'>
                {cartegories.map((cartegory, index) => (
                    <div
                        onClick={() => dispatch(fetchAsyncByCartegory(cartegory._id))}
                        className='cursor-pointer hover:scale-105 transform transition-all duration-300'
                        key={index}>
                        <h1>{cartegory.name}</h1>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Cartegory
