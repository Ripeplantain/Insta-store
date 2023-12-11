import { AnimatePresence, motion } from "framer-motion"
import { ShoppingCart, LogoutIcon } from "../../assets/icons"
import { useNavigate } from "react-router-dom"
import { useLogoutUserMutation } from "../../api/auth"
import { useEffect } from "react"
import useNotify from "../../hooks/useNotify"
import { ServerError } from "../../helper/types/errorType"
import { logout } from "../../state/feature/authSlice"
import { useDispatch } from "react-redux"


const UserDropDown = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [logoutUser, {isError, error, isSuccess}] = useLogoutUserMutation()
    const { ErrorMessage, SuccessMessage } = useNotify()
    const refreshToken = localStorage.getItem('refreshToken')

    useEffect(() => {
        if (isError) {
            const errorMessage = error as ServerError
            ErrorMessage(errorMessage.data.message)
        }

        if (isSuccess) {
            SuccessMessage("User has been logged out successfully")
            dispatch(logout())
            navigate("/login")
        }
    }, [isError, isSuccess, error, ErrorMessage, SuccessMessage, navigate, dispatch])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                className="bg-white p-6 w-fit absolute left-[65%] top-20">
                <ul>
                    <li
                        onClick={() => navigate('/order-history')}
                        className="flex gap-1 items-center cursor-pointer hover:scale-90 my-4">
                        <ShoppingCart className="text-2xl" />
                        <span className="font-roboto text-sm">Orders</span>
                    </li>
                    <li
                        onClick={() => logoutUser(refreshToken)}
                        className="flex gap-1 items-center cursor-pointer hover:scale-90 mt-5">
                        <LogoutIcon className="text-2xl" />
                        <span className="font-roboto text-sm">Logout</span>
                    </li>
                </ul>
            </motion.div>
        </AnimatePresence>
    )
}

export default UserDropDown