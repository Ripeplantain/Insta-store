


const HeroSection = () => {
    return (
        <section className="bg-primary flex justify-center items-center text-center py-20">
            <div>
                <h1 className="text-white text-6xl font-playfair tracking-wider">
                    Find whatever you need with us</h1>
                <p className="text-white text-xl font-roboto tracking-wide mt-4">
                    With seamless payment and delivery, we are here to make your life easier
                </p>
                <div>
                    <input
                        className="px-4 py-2 rounded-md mt-6" 
                        type="text" />
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md ml-4">
                        Search
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
