import { Navbar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncOrders, selectOrders, selectError, selectLoading } from "../../state/features/orderSlice";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import useFlashMessages from "../../hooks/useFlashMessages";
import { Order } from "../../state/features/orderSlice";
import { Product } from "../../state/features/productSlice";
import dayjs from "dayjs";


const OrderPage = () => {

    const dispatch = useDispatch()
    const orders = useSelector(selectOrders)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const { showErrorMessage } = useFlashMessages()

    useEffect(() => {
        dispatch(getAsyncOrders())
    }, [dispatch])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
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
        <div>
            <header className="w-full h-[10vh] bg-black">
                <Navbar />
            </header>
            <div className="flex flex-wrap-reverse justify-center my-20 gap-16">
                <div>
                    <h2 className="font-roboto text-2xl pb-2 border-b-2 border-gray-500">Order History </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Order ID</th>
                                    <th className="px-4 py-2">Products ID</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Location</th>
                                    <th className="px-4 py-2">Payment Status</th>
                                    <th className="px-4 py-2">Total</th>
                                    <th className="px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((order: Order) => (
                                    <tr key={order._id}>
                                        <td className="border px-4 py-2">{order._id}</td>
                                        <td className="border px-4 py-2">{
                                            order.product.map((product: Product) => (
                                                <span
                                                    className="border px-2 py-1 rounded-full mr-2"
                                                    key={product._id}>{product.name} </span>
                                            ))
                                        }</td>
                                        <td className="border px-4 py-2">{order.quantity}</td>
                                        <td className="border px-4 py-2">{order.status}</td>
                                        <td className="border px-4 py-2">{order.location}</td>
                                        <td className="border px-4 py-2">{order.paymentState}</td>
                                        <td className="border px-4 py-2">$ {order.total}</td>
                                        <td className="border px-4 py-2">{
                                            dayjs(order.createdAt).format('DD/MM/YYYY [at] HH:mm')
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2 className="font-roboto text-2xl pb-2 border-b-2 border-gray-500">Order Details </h2>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className="my-2">You can see all your orders here.</li>
                            <li className="my-2">You can also see the details of each order.</li>
                            <li className="my-2">You can also see the status of each order.</li>
                        </ul>
                    </div>
                    <hr className="my-6" />
                    <span className="my-6 text-xl">Total Orders - {orders.data.length}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderPage