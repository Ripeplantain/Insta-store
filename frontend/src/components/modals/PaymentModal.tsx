import React, { useRef, useEffect } from "react"
import { CloseIcon, InfoIcon } from "../../assets/icons"
import { CartState } from "../../helper/types/stateTypes"
import { OrderInput } from "../../helper/types/inputTypes"
import { useCreateOrderMutation } from "../../api/order"
import { Loader } from ".."
import useNotify from "../../hooks/useNotify"
import { ServerError } from "../../helper/types/errorType"
import { clearCart } from "../../state/feature/cartSlice"
import { useDispatch } from "react-redux"


interface PaymentModalProps {
    cart: CartState
    setShowPaymentModal: (value: boolean) => void
}


const PaymentModal: React.FC<PaymentModalProps> = ({setShowPaymentModal, cart}) => {

    const dispatch = useDispatch()
    const locationRef = useRef<HTMLTextAreaElement>(null)
    const [createOrder, { isLoading, isError, error, isSuccess, data }] = useCreateOrderMutation()
    const { SuccessMessage, ErrorMessage } = useNotify()
    
    const handldeClick = () => {
        if (locationRef.current){
            const order: OrderInput[] = []
            cart.items.forEach(item => {
                const orderItem = {
                    product: item._id,
                    quantity: item.quantity,
                    location: locationRef?.current?.value.toLowerCase() || "Pick Up",
                    total: item.quantity * item.price,
                    paymentState: "pending",
                }
                order.push(orderItem)
            })
            createOrder(order)
            dispatch(clearCart())
        }
    }

    useEffect(() => {
        if (isError) {
            const errorMessage = error as ServerError
            ErrorMessage(errorMessage.data.message)
        }
    
        if (isSuccess) {
            setShowPaymentModal(false)
            // dispatch(clearCart())
            SuccessMessage("Order created successfully")
        }
    }, [isError, isSuccess, ErrorMessage, SuccessMessage, error, data, dispatch, setShowPaymentModal])

    if (isLoading) return <Loader />

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Location for Delivery</h2>
                    <button
                        onClick={() => setShowPaymentModal(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <CloseIcon className="text-2xl" />
                    </button>
                </div>
                <textarea
                    ref={locationRef}
                    className="w-full h-24 border border-gray-300 rounded-md p-2 focus:outline-none"
                    placeholder="Enter your location here"
                />

                <span className="text-sm text-gray-600 inline-block mt-4">
                    <InfoIcon className="inline-block w-4 h-4 mr-1" />
                    We'll never share your location with anyone else.
                </span>

                <span className="text-sm text-gray-600 inline-block mt-4">
                    <InfoIcon className="inline-block w-4 h-4 mr-1" />
                    If you choose to come pick up your self chose "Pick Up" as your delivery option and contact vendor.
                </span>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={handldeClick}
                        className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-500 focus:outline-none">
                        Pay on Delivery
                    </button>
                    <button
                        // onClick={handldeClick}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
                        Pay Online
                    </button>
                </div>
            </div>
        </div>
    )
}

const MermoizedPaymentModal = React.memo(PaymentModal)
export default MermoizedPaymentModal
// export default PaymentModal
