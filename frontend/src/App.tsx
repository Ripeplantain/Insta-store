import { GuestLayout, Home, AppLayout } from "./Layouts"
import { Login, Register, Cart, Vendor } from "./components"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const App = () => {
  return (
    <>
      <Router>
        <Routes>

            <Route path="/login" element={<GuestLayout>
              {<Login />}
            </GuestLayout>} />
            <Route path="/register" element={<GuestLayout>
              {<Register />} 
            </GuestLayout>} />

            <Route path="/cart" element={<AppLayout> {<Cart />}  </AppLayout>} />
            <Route path="/vendor" element={<AppLayout> {<Vendor />}  </AppLayout>} />

            <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
