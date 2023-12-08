import React from 'react'
import { ProductState } from '../../helper/types/stateTypes'
import { Product } from '../../assets'
import { useDispatch } from 'react-redux'
import { addItem } from '../../state/feature/cartSlice'
import useNotify from '../../hooks/useNotify'


interface Props {
    product: ProductState
}

const ProductCard: React.FC<Props> = ({ product}) => {

    const dispatch = useDispatch()
    const { SuccessMessage } = useNotify()

    const handleAddToCart = () => {
        dispatch(addItem(product))
        SuccessMessage('Product added to cart')
    }

    return (
        <div className="flex flex-col justify-center items-center m-8 p-4 shadow-2xl max-w-3/12">
            <div className="flex flex-col gap-5 justify-center items-center">
                <img src={Product} alt={product.name} className="w-64 h-64 object-cover rounded-t-md" />
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-2xl font-roboto text-gray-800">{product.name}</h1>
                    <h1 className="text-2xl font-roboto text-gray-800">GH&#8373; {product.price}</h1>
                    <span className="text-sm font-roboto text-green-600 my-3">{product.vendor_id?.name}</span>
                </div>
                <button
                    onClick={() => handleAddToCart()}
                    className='bg-gray-900 hover:bg-black delay-100 ease-in-out p-5 rounded-xl'>
                    <span className="text-white font-roboto text-lg">Add to Cart</span>
                </button>
            </div>
        </div>
    )
}

const MemoizedProductCard = React.memo(ProductCard)
export default MemoizedProductCard