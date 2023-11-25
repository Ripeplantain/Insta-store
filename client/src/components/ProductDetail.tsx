import { Product } from "../state/features/productSlice";
import { Default } from "../assets/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/features/cartSlice";
import { CloseIcon } from "../assets/icons";


interface Props {
    setShowModal: (value: boolean) => void;
    product: Product | null;
}


const ProductDetail: React.FC<Props> = ({setShowModal, product}) => {

    const dispatch = useDispatch()

    const hanldeClick = (product: Product) => {
        dispatch(addToCart(product))
        setShowModal(false)
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{product?.name}</h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <CloseIcon />
                    </button>
                </div>
                <div>
                    <img 
                        className="w-full h-64 object-cover rounded-md" 
                        src={Default} alt="product" />
                </div>
                <h3 className="font-semibold text-xl my-2">Description</h3>
                <p className="text-gray-700 mb-2">{product?.description}</p>
                <span className="text-2xl">${product?.price}</span>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
                        Cancel
                    </button>
                    <button
                        onClick={() => hanldeClick(product!)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default ProductDetail
