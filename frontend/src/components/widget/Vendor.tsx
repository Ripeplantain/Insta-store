import React, {useState} from 'react'
import { ProductForm, ProductTable, OrderTable } from '..'

const Vendor = () => {

    const [showComponent, setShowComponent] = useState('add product')
    const selectedStyle = 'bg-red-500 hover:bg-cyan-700 text-white delay-100 font-roboto cursor-pointer p-5 rounded-xl'

    return (
        <div className='flex flex-col items-center justify-center mt-[10rem]'>
            <h1 className='text-3xl uppercase tracking-wider font-playfair'>Your Dashboard</h1>
            <div className="flex flex-col items-centerr justify-center my-12 gap-6">
                {/* Dashboard box */}
                <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16'>
                    <div className='flex flex-col justify-center items-center bg-black text-white border-2 border-gray-200 rounded-3xl w-[200px] h-[150px]'>
                        <h3 className='font-playfair text-2xl'>Total Orders</h3>
                        <h3 className='font-playfair text-2xl'>300</h3>
                    </div>
                    <div className='flex flex-col justify-center items-center bg-black text-white border-2 border-gray-200 rounded-3xl w-[200px] h-[150px]'>
                        <h3 className='font-playfair text-2xl'>Total Sales</h3>
                        <h3 className='font-playfair text-2xl'>300</h3>
                    </div>
                    <div className='flex flex-col justify-center items-center bg-black text-white border-2 border-gray-200 rounded-3xl w-[200px] h-[150px]'>
                        <h3 className='font-playfair text-2xl'>Total Products</h3>
                        <h3 className='font-playfair text-2xl'>300</h3>
                    </div>
                </div>

                <div className='flex flex-wrap justify-center items-center my-12 gap-6'>
                    <div
                        onClick={() => setShowComponent('add product')}
                        className={showComponent === 'add product' ? selectedStyle : 'bg-cyan-500 hover:bg-red-700 hover:text-white delay-100 font-roboto cursor-pointer p-5 rounded-xl'}>
                        <span>Add product</span>
                    </div>
                    <div
                        onClick={() => setShowComponent('view products')}
                        className={showComponent === 'view products' ? selectedStyle : 'bg-cyan-500 hover:bg-red-700 hover:text-white delay-100 font-roboto cursor-pointer p-5 rounded-xl'}>
                        <span>View products</span>
                    </div>
                    <div
                        onClick={() => setShowComponent('view orders')}
                        className={showComponent === 'view orders' ? selectedStyle : 'bg-cyan-500 hover:bg-red-700 hover:text-white delay-100 font-roboto cursor-pointer p-5 rounded-xl'}>
                        <span>View Orders</span>
                    </div>
                </div>

                {/* Show component */}
                {showComponent === 'add product' && <ProductForm />}
                {showComponent === 'view products' && <ProductTable />}
                {showComponent === 'view orders' && <OrderTable />}
            </div>
        </div>
    )
}

const MemoizedVendor = React.memo(Vendor)
export default MemoizedVendor
