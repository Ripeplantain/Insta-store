import React from 'react'
import { InfoIcon, GlobeIcon } from "../../assets/icons"
import { useSelector, useDispatch } from "react-redux"
import 
    { 
        selectCartCount, selectCartItems, selectCartTotal,
        addItem, removeItem, removeItemFromCart, selectCart 
    } from "../../state/feature/cartSlice"
import { Product } from "../../assets"
import { DeleteIcon } from "../../assets/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import { PaymentModal } from ".."


const MobileCart = () => {

    const cartCount = useSelector(selectCartCount)
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    const cart = useSelector(selectCart)
    const dispatch = useDispatch()
    const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)

    return (
        <div className="min-h-screen">
            <div className="mt-[108px] bg-gray-200 p-4 text-center">
                <InfoIcon className="w-6 h-6 inline-block mr-2 text-gray-700" />
                <span 
                    className="font-roboto uppercase text-gray-700 tracking-wider">
                        Feel free to message vendors after making an order</span>
            </div>
            <div className="flex flex-col items-center mt-16">
                <h3 className="text-3xl font-roboto font-semibold">My Shopping Cart</h3>
                    {cartItems.length > 0 ? (
                        <div className='my-12'>
                            {cartItems.map(item => (
                                <div
                                    className="border-b-2 border-gray-200"
                                    key={item._id}>
                                    <div className="flex flex-row gap-5 items-center">
                                        <img src={Product} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                        {/* <img src={item.picture} alt={item.name} className="w-16 h-16 object-cover rounded-md" /> */}
                                        <div className="flex flex-col">
                                            <span className="font-roboto text-gray-800">{item.name}</span>
                                            <span className="font-roboto text-gray-500 text-sm">{item.vendor_id?.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-row gap-2 items-center">
                                                <button
                                                    onClick={() => dispatch(removeItem(item))}
                                                    className="bg-gray-300 hover:bg-gray-400 delay-100 ease-in-out text-gray-800 font-bold py-2 px-4 rounded-full">
                                                        -
                                                </button>
                                                <span className="font-roboto text-xl">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(addItem(item))}
                                                    className="bg-gray-300 hover:bg-gray-400 delay-100 ease-in-out text-gray-800 font-bold py-2 px-4 rounded-full">
                                                        +
                                                </button>
                                            </div>
                                            <span className="font-roboto text-gray-800 text-xl">GH&#8373; {item.price}</span>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={() => dispatch(removeItemFromCart(item))}
                                                className="font-roboto text-gray-800 text-xl hover:text-gray-500">
                                                    <DeleteIcon className="w-6 h-6 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center mt-12 gap-6">
                            <span className="font-roboto text-xl text-gray-800">Your cart is empty</span>
                            <Link
                                to="/"
                                className="font-roboto text-xl bg-black hover:bg-gray-500 delay-100 ease-in-out text-white p-4 rounded-xl">
                                    Continue Shopping</Link>
                        </div>
                    )}
            </div>

            <div className="flex flex-col justify-around items-center text-center gap-3 my-12">
                <div>
                    <GlobeIcon className="w-8 h-8 inline-block mr-2 text-gray-700" />
                    <span className="text-gray-700 font-roboto">
                        Our Deliveries are safe everywhere</span>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="font-roboto text-gray-700 text-xl">Cart Items: {cartCount}</span>
                    <span className="font-roboto text-gray-700 text-xl">Cart Total: GH&#8373; {cartTotal}</span>
                </div>
            </div>

            <div className="flex justify-center items-center my-12">
                <button
                    onClick={() => setShowPaymentModal(true)}
                    className="font-roboto text-xl bg-black hover:bg-gray-500 delay-100 ease-in-out text-white p-4 rounded-xl">
                        Proceed to Checkout</button>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal setShowPaymentModal={setShowPaymentModal} cart={cart} />
            )}
        </div>
    )
}


const MermoizedMobileCart = React.memo(MobileCart)
export default MermoizedMobileCart