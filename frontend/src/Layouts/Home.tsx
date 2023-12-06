import { Navbar, Cartegories } from "../components"
import { HeroSection } from "../assets"

const Home = () => {

    const style = {
        backgroundImage: `url(${HeroSection})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '80vh'
    }

    return (
        <div>
            <section
                className="relative flex justify-center items-center overflow-hidden"
                style={style}>
                <div className="absolute top-0 left-0 w-full h-[80vh] bg-black/70"></div>
                <Navbar />
                <div className="absolute bottom-0 left-0 w-full h-[80vh] flex flex-col text-center justify-center items-center gap-6">
                    <h1 className="text-6xl text-white font-comingSoon capitalize">Quick trade flow</h1>
                    <h2 className="text-2xl text-white font-roboto">The best place to buy your favorite products</h2>
                    <div className="flex gap-2">
                        <input
                            className="px-4 py-2 rounded-md border border-primary/60"
                            type="text" />
                        <button
                            className="px-4 py-2 rounded-md bg-black hover:bg-gray-700 
                            focus:ring-2 focus:ring-primary/50 delay-100 ease-in-out text-white font-roboto">Search</button>
                    </div>
                </div>
            </section>
            <Cartegories />
        </div>
    )
}

export default Home
