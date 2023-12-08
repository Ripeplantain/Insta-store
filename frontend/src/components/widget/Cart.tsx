import { InfoIcon, GlobeIcon } from "../../assets/icons"
import { useSelector, useDispatch } from "react-redux"
import 
    { 
        selectCartCount, selectCartItems, selectCartTotal,
        addItem, removeItem, removeItemFromCart 
    } from "../../state/feature/cartSlice"
import { Product } from "../../assets"
import { DeleteIcon } from "../../assets/icons"
import { Link } from "react-router-dom"


const Cart = () => {

    const cartCount = useSelector(selectCartCount)
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    const dispatch = useDispatch()


    return (
        <>
            <div className="mt-[108px] bg-gray-200 p-4 text-center">
                <InfoIcon className="w-6 h-6 inline-block mr-2 text-gray-700" />
                <span 
                    className="font-roboto uppercase text-gray-700 tracking-wider">
                        Feel free to message vendors after making an order</span>
            </div>
            <div className="flex flex-col items-center mt-16">
                <h3 className="text-3xl font-roboto font-semibold">My Shopping Cart</h3>
                    {cartItems.length > 0 ? (
                        <table className="table-auto w-11/12 mt-12">
                            <thead>
                                <tr>
                                    <th className="text-left">Product</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th className="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr
                                        className="border-b-2 border-gray-200"
                                        key={item._id}>
                                        <td className="flex flex-row gap-5 items-center">
                                            <img src={Product} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                            {/* <img src={item.picture} alt={item.name} className="w-16 h-16 object-cover rounded-md" /> */}
                                            <div className="flex flex-col">
                                                <span className="font-roboto text-gray-800">{item.name}</span>
                                                <span className="font-roboto text-gray-500 text-sm">{item.vendor_id?.name}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => dispatch(removeItem(item))}
                                                    className="bg-black hover:scale-125 text-white px-2">
                                                        -</button>
                                                <span className="font-roboto text-gray-800">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(addItem(item))}
                                                    className="bg-black hover:scale-125 text-white px-2">
                                                        +</button>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span className="font-roboto text-gray-800">GH&#8373; {item.price}</span>
                                        </td>
                                        <td className="text-center">
                                            <span className="font-roboto text-gray-800">GH&#8373; {item.price * item.quantity}</span>
                                        </td>
                                        <td className="text-center">
                                                <DeleteIcon 
                                                    onClick={() => dispatch(removeItemFromCart(item))}
                                                    className="w-6 h-6 text-red-600 hover:scale-125 delay-100 ease-in-out cursor-pointer" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

            <div className="flex justify-around items-center my-12">
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
                    className="font-roboto text-xl bg-black hover:bg-gray-500 delay-100 ease-in-out text-white p-4 rounded-xl">
                        Proceed to Checkout</button>
                
            </div>
        </>
    )
}

export default Cart
