import { CartIcon, NavIcon, CloseIcon, UserIcon } from "../assets/icons"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsAuth, selectUser, selectRefreshToken } from "../state/features/authSlice"
import useAuth from "../hooks/useAuth"



const Navbar = () => {
    const [showNav, setShowNav] = useState(false)
    const [isTopPage, setIsTopPage] = useState(true)
    const navBackground = isTopPage ? "bg-primary" : "bg-white"
    const isAuth = useSelector(selectIsAuth)
    const user = useSelector(selectUser)
    const { logout } = useAuth()
    const refreshToken = useSelector(selectRefreshToken)

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
        <header className={`${navBackground} w-full top-0 py-6`}>
            <div className="flex justify-around items-center">
                <h1 className="font-playfair tracking-wider text-4xl">InstaStore</h1>
                <nav>
                    
                    {showNav ? (
                        <CloseIcon
                            onClick={() => setShowNav(!showNav)}
                            className="md:hidden text-4xl" />
                    ) : (
                        <NavIcon
                            onClick={() => setShowNav(!showNav)}
                            className="md:hidden text-4xl" />
                    )}

                    <ul className="hidden md:flex items-center gap-11 font-roboto">
                        <li className="flex items-center gap-1 hover:scale-90 cursor-pointer">
                            <CartIcon className="text-3xl" />
                            <div className="flex flex-col">
                                <span className="bg-white rounded-full text-center">1</span>
                                <span>Cart</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-1 cursor-pointer hover:scale-90">
                            <UserIcon className="text-3xl" />
                            <div className="flex flex-col">
                                <span>Welcome,</span>
                                <span>{user?.firstName}</span>
                            </div>
                        </li>
                        <li>
                            {
                                isAuth ? (
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

            {/* On Mobile Screen */}
            <AnimatePresence>
                {showNav && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="flex flex-col items-center gap-4 py-6 font-roboto"
                    >
                        <div className="flex items-center gap-1">
                            <CartIcon className="text-3xl" />
                            <div className="flex flex-col">
                                <span className="bg-white rounded-full text-center">1</span>
                                <span>Cart</span>
                            </div>
                        </div>
                        {
                            isAuth ? (
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
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar
