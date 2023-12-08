import { Navbar, Cartegories, Products, Footer } from "../components"
import { HeroSection } from "../assets"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { setSearchProduct } from "../state/feature/productSlice"

const Home = () => {

    const style = {
        backgroundImage: `url(${HeroSection})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '80vh'
    }
    const searchRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    return (
        <div>
            <section
                className="relative flex justify-center items-center overflow-hidden"
                style={style}>
                <div className="absolute top-0 left-0 w-full h-[80vh] bg-black/70"></div>
                <Navbar color="transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[80vh] flex flex-col text-center justify-center items-center gap-6">
                    <h1 className="text-6xl text-white font-playfair capitalize">Insta Store</h1>
                    <h2 className="text-2xl text-white font-roboto">The best place to buy your favorite products</h2>
                    <div className="flex gap-2">
                        <input
                            ref={searchRef}
                            className="px-4 py-2 rounded-md border border-primary/60"
                            type="text" />
                        <button
                            onClick={() => dispatch(setSearchProduct(searchRef.current?.value || ''))}
                            className="px-4 py-2 rounded-md bg-black hover:bg-gray-700 
                            focus:ring-2 focus:ring-primary/50 delay-100 ease-in-out text-white font-roboto">Search</button>
                    </div>
                </div>
            </section>
            <Cartegories />
            <Products />
            <Footer />
        </div>
    )
}

export default Home
