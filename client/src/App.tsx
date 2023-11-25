import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginPage, RegisterPage, HomePage, ItemPage, CartPage } from "./pages"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
