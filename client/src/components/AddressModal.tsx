import { CloseIcon, InfoIcon } from "../assets/icons"
import { useRef } from "react";
import {Cart} from "../state/features/cartSlice"
import { useDispatch, useSelector } from "react-redux";
import { postAsyncOrder, selectError, selectLoading } from "../state/features/orderSlice";
import { clearCart } from "../state/features/cartSlice";
import useFlashMessages from "../hooks/useFlashMessages";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";


interface Prop {
    setShowModal: (value: boolean) => void;
    cart: Cart;
}

const AddressModal: React.FC<Prop> = ({setShowModal, cart}) => {

    const locationRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useDispatch()
    const { showErrorMessage } = useFlashMessages()
    const isLoading = useSelector(selectLoading)
    const error = useSelector(selectError)

    const handldeClick = () => {
        if (locationRef.current) {
            const location = locationRef.current.value
            const order = {
                location: location,
                product: cart.items.map(item => item._id),
                quantity: cart.count,
                total: cart.total,
                paymentState: "pending"
            }
            dispatch(postAsyncOrder(order))
            dispatch(clearCart())
            setShowModal(false)
        }
    }

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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Location for Delivery</h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <CloseIcon />
                    </button>
                </div>
                <textarea
                    ref={locationRef}
                    className="w-full h-24 border border-gray-300 rounded-md p-2 focus:outline-none"
                    placeholder="Enter your location here"
                />

                <span className="text-sm text-gray-600">
                    <InfoIcon className="inline-block w-4 h-4 mr-1" />
                    We will deliver your order to this location
                </span>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
                        Cancel
                    </button>
                    <button
                        onClick={handldeClick}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressModal
