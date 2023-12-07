import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <footer>
            <div className="bg-black text-white py-4 px-6 flex flex-col md:flex-row justify-around text-center items-center gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-roboto">Insta Store</h1>
                    <p className="text-sm font-roboto">Become a vendor with us</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-roboto">Contact Us</h1>
                    <p className="text-sm font-roboto">Email:
                        <span className="text-primary">
                            <a href="mailto:irvingmanny@gmail.com" className="hover:text-primary/50">
                                irvingmanny@gmail.com
                            </a>
                        </span>
                    </p>
                    <p className="text-sm font-roboto">Phone:
                        <span className="text-primary">
                            <a href="tel:+233 55 555 5555" className="hover:text-primary/50">
                                +233 55 044 1210
                            </a>
                        </span>
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-roboto">Quick Links</h1>
                    <p className="text-sm font-roboto">
                        <span className="text-primary">
                            <Link to="/" className="hover:text-primary/50">
                                Home
                            </Link>
                        </span>
                    </p>
                    <p className="text-sm font-roboto">
                        <span className="text-primary">
                            <Link to="/orders" className="hover:text-primary/50">
                                Orders
                            </Link>
                        </span>
                    </p>
                    <p className="text-sm font-roboto">
                        <span className="text-primary">
                            <a href="/cart" className="hover:text-primary/50">
                                Cart
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
