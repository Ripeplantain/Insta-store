import { Background } from "../assets/image"


const HeroSection = () => {

    const styling = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundCover: 'center',
        height: '80vh'
    }

    return (
        <section
            style={styling}
            className="flex justify-center items-center overflow-hidden relative"
        >
        <div className="absolute top-0 left-0 w-full h-[80vh] bg-black/80"></div>
        <div className="z-10 text-center">
            <h1 className="text-white font-playfair text-5xl">Your Digital Marketplace</h1>
            <p className="text-white font-roboto text-sm mt-6">Your one stop shop for all your needs</p>
            <input
                placeholder="Search for products"
                className="bg-white px-4 py-2 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" />
            <button
                className="bg-black text-white px-6 py-3 rounded-md mt-6 hover:scale-90">
                Search
        </button>
        </div>
        </section>
    )
}

export default HeroSection
