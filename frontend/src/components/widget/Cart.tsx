import useMediaQuery from "../../hooks/useMediaQuery"
import { DesktopCart, MobileCart } from ".."


const Cart = () => {

    const isAboveSmallScreens = useMediaQuery('(min-width:768px)')

    return (
        <div>
            {isAboveSmallScreens ? <DesktopCart /> : <MobileCart />}
        </div>
    )
}

export default Cart
