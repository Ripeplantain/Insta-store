import React, { ReactNode } from 'react'
import { Navbar } from '../components'


interface LayoutProp {
    children: ReactNode
}

const AppLayout: React.FC<LayoutProp> = ( {children}) => {
    return (
        <>
            <Navbar color='black' />
            {children}
        </>
    )
}

export default AppLayout
