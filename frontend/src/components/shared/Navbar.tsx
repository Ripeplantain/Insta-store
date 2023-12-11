import { Link } from "react-router-dom"
import { ShoppingCart, UserIcon, NavIcon, CloseIcon, MarketIcon } from "../../assets/icons"
import useMediaQuery from "../../hooks/useMediaQuery"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectIsAuthenticated, selectUser, selectRefreshToken } from "../../state/feature/authSlice"
import { useLogoutUserMutation } from "../../api/auth"
import useNotify from "../../hooks/useNotify"
import { ServerError } from "../../helper/types/errorType"
import { logout } from "../../state/feature/authSlice"
import { selectCartCount } from "../../state/feature/cartSlice"
import { UserDropDown, VendorModal } from ".."

interface NavbarProps {
    color: string
}

const Navbar: React.FC<NavbarProps> = ({color}) => {

    const isAboveSmallScreens = useMediaQuery('(min-width:768px)')
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const [showVendorModal, setShowVendorModal] = useState<boolean>(false)
    const [isTopofPage, setIsTopofPage] = useState<boolean>(true)
    const navBackground = isTopofPage ? `bg-${color}` : 'bg-black'
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const user = useSelector(selectUser)
    const refreshToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutUser, {isError, error, isSuccess}] = useLogoutUserMutation()
    const { ErrorMessage, SuccessMessage } = useNotify()
    const cartCount = useSelector(selectCartCount)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setIsTopofPage(false)
            } else {
                setIsTopofPage(true)
            }
        })
    }, [])

    useEffect(() => {
        if (isError) {
            const errorMessage = error as ServerError
            console.log(errorMessage)
            ErrorMessage(errorMessage.data.message)
        }

        if (isSuccess) {
            SuccessMessage("User has been logged out successfully")
            dispatch(logout())
            navigate("/login")
        }
    }, [isError, isSuccess, error, dispatch, navigate, ErrorMessage, SuccessMessage])

    return (
        <nav className={`${navBackground} z-40 fixed w-full top-0 py-6`}>
            <div>
                <div className="flex justify-around items-center">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-white text-[40px] font-comingSoon font-bold ml-2">IS</Link>
                    </div>
                    
                    {/* Desktop Nav */}
                    {isAboveSmallScreens ? (
                    <div className="flex items-center gap-8 text-white">
                        <Link
                            to="/cart"
                            className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                            <ShoppingCart className="text-3xl" />
                            <span className="text-sm font-roboto">{cartCount}</span>
                        </Link>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-8">
                                <button
                                    onClick={() => setShowDropDown(!showDropDown)}
                                    className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                    <UserIcon className="text-2xl" />
                                    <span className="text-sm font-roboto">Hello {user?.firstName}</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                <UserIcon className="text-2xl" />
                                <span className="text-sm font-roboto">Login</span>
                            </Link>
                        )}

                        {/* Dashboards */}
                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                <UserIcon className="text-2xl" />
                                <span className="text-sm font-roboto">Admin</span>
                            </Link>
                        )}

                        {user?.role === "vendor" && (
                            <Link
                                to="/vendor"
                                className="flex items-center gap-2 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                <MarketIcon className="text-2xl" />
                                <span className="text-sm font-roboto">Vendor Dashboard</span>
                            </Link>
                        )}

                        {user?.role === "client" && (
                            <button
                                onClick={() => setShowVendorModal(!showVendorModal)}
                                className="bg-yellow-700 hover:bg-yellow-500 delay-100 ease-in-out p-4">
                                Become a Vendor
                            </button>
                        )}
                    </div> 
                    ) : (
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <NavIcon className="text-4xl text-white" />
                        </button>
                    )}

                    {/* mobile view */}
                    {!isAboveSmallScreens && isMenuToggled && (
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center bg-primary">
                            {/* Close Icon */}
                            <div className="flex place-self-end justify-end p-12">
                                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                    <CloseIcon className="text-4xl" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <div className="flex flex-col items-center gap-8">
                                <Link
                                    to="/cart"
                                    className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                    <ShoppingCart className="text-3xl" />
                                    <span className="text-sm font-roboto">{cartCount}</span>
                                </Link>
                                {isAuthenticated ? (
                                    <div className="flex flex-col items-center gap-8">
                                        <Link
                                            to="/orders"
                                            className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                            <UserIcon className="text-2xl" />
                                            <span className="text-sm font-roboto">User Profile</span>
                                        </Link>
                                        <button
                                            onClick={() => logoutUser(refreshToken)}
                                            className="bg-gray-800 text-white hover:bg-red-500 delay-100 ease-in-out p-4 rounded-2xl">
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                        <UserIcon className="text-2xl" />
                                        <span className="text-sm font-roboto">Login</span>
                                    </Link>
                                )}
                                {/* Dashboards */}
                                {user?.role === "admin" && (
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                        <UserIcon className="text-2xl" />
                                        <span className="text-sm font-roboto">Admin</span>
                                    </Link>
                                )}

                                {user?.role === "vendor" && (
                                    <Link
                                        to="/vendor"
                                        className="flex items-center gap-2 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                        <MarketIcon className="text-2xl" />
                                        <span className="text-sm font-roboto">Vendor Dashboard</span>
                                    </Link>
                                )}

                                {user?.role === "client" && (
                                    <button
                                        onClick={() => setShowVendorModal(!showVendorModal)}
                                        className="bg-yellow-700 p-4 text-white">
                                        Become a Vendor
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* User DropDown */}
                    {showDropDown && <UserDropDown />}

                    {/* Vendor Modal */}
                    {showVendorModal && <VendorModal setShowVendorModal={setShowVendorModal} />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
