import { ReactNode } from "react"
import { Background } from "../assets"

interface LayoutProp {
    children: ReactNode
}


const GuestLayout: React.FC<LayoutProp> = ({children}) => {

    const style = {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div style={style}>
            <div className="absolute bg-white/60 h-screen w-full"></div>
            {children}
        </div>
    )
}

export default GuestLayout
