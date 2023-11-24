import { useSelector, useDispatch } from "react-redux"
import { selectCart, removeFromCart, addToCart } from "../../state/features/cartSlice"
import { Navbar } from "../../components"
import { Default } from "../../assets/image"



const CartPage = () => {

    const cart = useSelector(selectCart)
    const dispatch = useDispatch()

    return (
        <div>
            <header className="w-full h-[10vh] bg-black">
                <Navbar />
            </header>
        <div className="flex flex-wrap-reverse justify-center my-20 gap-16">
            <div>
                <h2 className="font-roboto text-2xl pb-2 border-b-2 border-gray-500">Cart - {cart.count}</h2>
                <div className="flex flex-col gap-8 mt-8">
                    {cart.items.map((item, index) => (
                        <div key={index} className="flex gap-4">
                            <img className="w-44 object-cover" src={Default} alt="product-image" />
                            <div className="font-roboto">
                                <h3 className="text-3xl mb-3">{item.name}</h3>
                                <p className="mb-2 text-sm">{item.description}</p>
                                <p className="text-2xl">${item.price}</p>
                                <div className="flex flex-wrap items-center justify-between py-4">
                                    <div>
                                        <button
                                            onClick={() => dispatch(addToCart(item))}
                                            className="bg-black text-white px-4 py-2 rounded-md">+</button>
                                        <span className="px-4">{item.number}</span>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item))}
                                            className="bg-black text-white px-4 py-2 rounded-md">-</button>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item))}
                                        className="bg-red-700 text-white px-4 py-2 rounded-md">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-roboto text-2xl pb-2 border-b-2 border-gray-500">Cart Summary</h2>
                <div className="my-4">
                    <span className="text-xl">Items -</span>
                    <span className="text-xl ms-3">{cart.count}</span>
                </div>

                <div>
                    <span className="text-3xl">Total</span>
                    <span className="text-3xl ms-3">${cart.total}</span>
                </div>
                <button className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-md mt-2">Checkout</button>
            </div>
        </div>

        </div>
    )
}

export default CartPage
