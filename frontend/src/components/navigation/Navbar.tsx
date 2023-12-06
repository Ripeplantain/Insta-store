// import { Logo } from "../../assets"
import { Link } from "react-router-dom"
import { ShoppingCart, UserIcon, NavIcon, CloseIcon } from "../../assets/icons"
import useMediaQuery from "../../hooks/useMediaQuery"
import { useState } from "react"
import { motion } from "framer-motion"


const Navbar = () => {

    const isAboveSmallScreens = useMediaQuery('(min-width:768px)')
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)

    return (
        <nav className="z-40 fixed w-full top-0 py-6">
            <div>
                <div className="flex justify-around items-center">
                    <div className="flex items-center">
                        {/* <img src={Logo} alt="logo" className="w-20" /> */}
                        <Link
                            to="/"
                            className="text-[40px] font-comingSoon font-bold ml-2">IS</Link>
                    </div>
                    
                    {/* Desktop Nav */}
                    {isAboveSmallScreens ? (
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                            <UserIcon className="text-2xl" />
                            <span className="text-sm font-roboto">Login</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                            <ShoppingCart className="text-3xl" />
                            <span className="text-sm font-roboto">0</span>
                        </div>
                    </div> 
                    ) : (
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <NavIcon className="text-4xl" />
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
                                <div className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                    <UserIcon className="text-2xl" />
                                    <span className="text-sm font-roboto">Login</span>
                                </div>
                                <div className="flex items-center gap-1 cursor-pointer hover:scale-90 delay-100 transition-all ease-in-out">
                                    <ShoppingCart className="text-3xl" />
                                    <span className="text-sm font-roboto">0</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
