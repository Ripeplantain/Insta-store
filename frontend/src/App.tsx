import { GuestLayout, Home } from "./Layouts"
import { Login, Register } from "./components"
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

            <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
