import { CartIcon, NavIcon, CloseIcon, UserIcon } from "../assets/icons"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {  selectUser, selectRefreshToken } from "../state/features/authSlice"
import useAuth from "../hooks/useAuth"
import { selectCartCount } from "../state/features/cartSlice"
import { useNavigate } from "react-router-dom"
import { DropDown, VendorModal } from "."



const Navbar = () => {
    const [showNav, setShowNav] = useState(false)
    const [isTopPage, setIsTopPage] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showVendorModal, setShowVendorModal] = useState(false)
    const navBackground = isTopPage ? "bg-transparent" : "bg-black"
    const user = useSelector(selectUser)
    const { logout } = useAuth()
    const refreshToken = useSelector(selectRefreshToken)
    const cartCount = useSelector(selectCartCount)
    const navigate = useNavigate()

    const handleLogout = () => {
        const data: {refreshToken:string | null} = {
            refreshToken
        }
        logout(data)
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 100) {
                setIsTopPage(false)
            } else {
                setIsTopPage(true)
            }
        })
    }, [])

    return (
        <header className={`${navBackground} z-40 fixed w-full top-0 py-6`}>
            <div className="flex justify-around items-center">
                <h1
                    onClick={() => navigate("/")}
                    className="text-white font-playfair tracking-wider text-4xl cursor-pointer">InstaStore</h1>
                <nav>
                    
                    {showNav ? (
                        <CloseIcon
                            onClick={() => setShowNav(!showNav)}
                            className="text-white md:hidden text-4xl" />
                    ) : (
                        <NavIcon
                            onClick={() => setShowNav(!showNav)}
                            className="text-white md:hidden text-4xl" />
                    )}

                    <ul className="hidden md:flex items-center gap-11 font-roboto text-white">
                        <li
                            onClick={() => navigate("/cart")}
                            className="flex gap-1 hover:scale-90 cursor-pointer">
                            <CartIcon className="text-3xl" />
                            <div className="flex flex-col">
                                <span className="place-self-start">{cartCount}</span>
                            </div>
                        </li>
                        <li
                            onClick={() => setShowModal(!showModal)}
                            className="flex items-center gap-1 cursor-pointer hover:scale-90">
                            <UserIcon className="text-3xl" />
                            <div className="flex flex-col">
                                <span>Welcome,</span>
                                <span>{user?.firstName}</span>
                            </div>
                        </li>
                        <li>
                            {user?.role === "vendor" || user?.role === "admin" || localStorage.getItem("vendors") ? (
                                <Link
                                    to="/vendor"
                                    className="bg-cyan-600 text-white px-6 py-3 hover:cyan-900">
                                    Vendor Inventory
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setShowVendorModal(!showVendorModal)}
                                    className="bg-yellow-600 text-white px-6 py-3 hover:scale-90">
                                    Become a vendor
                                </button>
                            )}
                        </li>
                        <li>
                            {
                                user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="bg-black text-white px-6 py-3 hover:scale-90">
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="bg-black text-white px-6 py-3 hover:scale-90">
                                        Login
                                    </Link>
                                )
                            }
                        </li>
                    </ul>
                </nav>
            </div>

            {/* PopUp Modal */}
            {showModal && (
                <DropDown />
            )}

            {/* Vendor Modal */}
            {showVendorModal && (
                <VendorModal setShowVendorModal={setShowVendorModal} />
            )}

            {/* On Mobile Screen */}
            <AnimatePresence>
                {showNav && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="flex flex-col items-center gap-4 py-6 font-roboto bg-black"
                    >
                        <div
                            onClick={() => navigate("/cart")}
                            className="flex items-center gap-1">
                            <CartIcon className="text-3xl text-white" />
                            <div className="flex flex-col">
                                <span className="bg-white rounded-full text-center">{cartCount}</span>
                                <span>Cart</span>
                            </div>
                        </div>
                        <div
                            onClick={() => setShowModal(!showModal)}
                            className="flex items-center gap-1">
                            <UserIcon className="text-3xl text-white" />
                            <div className="flex flex-col text-white">
                                <span>Welcome,</span>
                                <span>{user?.firstName}</span>
                            </div>
                        </div>
                        <li>
                            {user?.role === "vendor" || user?.role === "admin" || localStorage.getItem("vendors") ? (
                                <Link
                                    to="/vendor"
                                    className="bg-cyan-600 text-white px-6 py-3 hover:cyan-900">
                                    Vendor Inventory
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setShowVendorModal(!showVendorModal)}
                                    className="bg-yellow-600 text-white px-6 py-3 hover:scale-90">
                                    Become a vendor
                                </button>
                            )}
                        </li>
                        {
                            user ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-6 py-3 hover:scale-90">
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-red-600 text-white px-6 py-3 hover:scale-90">
                                    Login
                                </Link>
                            )
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar
