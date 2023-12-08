import React, { ReactNode } from 'react'
import { Navbar, Footer } from '../components'


interface LayoutProp {
    children: ReactNode
}

const AppLayout: React.FC<LayoutProp> = ( {children}) => {
    return (
        <>
            <Navbar color='black' />
            {children}
            <Footer />
        </>
    )
}

export default AppLayout
