import { AnimatePresence, motion } from "framer-motion"
import { CartIcon } from "../assets/icons"
import { useNavigate } from "react-router-dom"



const DropDown = () => {

    const navigate = useNavigate()

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                className="bg-white p-6 w-fit absolute left-[69%]">
                <ul>
                    <li
                        onClick={() => navigate('/order-history')}
                        className="flex gap-1 items-center cursor-pointer hover:scale-90 my-4">
                        <CartIcon className="text-2xl" />
                        <span className="font-roboto text-sm">Orders</span>
                    </li>
                </ul>
            </motion.div>
        </AnimatePresence>
    )
}

export default DropDown
