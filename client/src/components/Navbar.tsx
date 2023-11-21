import { CartIcon, NavIcon, CloseIcon } from "../assets/icons"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"



const Navbar = () => {
    const [showNav, setShowNav] = useState(false)

    return (
        <header className="bg-primary w-full top-0 py-6">
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
                        <li className="flex items-center gap-1 hover:scale-90">
                            <CartIcon className="text-3xl" />
                            <div className="flex flex-col">
                                <span className="bg-white rounded-full text-center">1</span>
                                <span>Cart</span>
                            </div>
                        </li>
                        <li>
                            <button className="bg-black text-white px-6 py-3 hover:scale-90">
                                Login
                            </button>
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
                        <button className="bg-black text-white px-6 py-3 hover:scale-90">
                            Login
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar
