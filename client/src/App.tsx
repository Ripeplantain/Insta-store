import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginPage, RegisterPage, HomePage, CartPage, OrderPage, Dashboard } from "./pages"
import { PrivateRoute } from "./components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import { useSelector } from "react-redux"
import { selectIsAuth } from "./state/features/authSlice"


const App = () => {

  const isAuth = useSelector(selectIsAuth)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAuth ? <HomePage /> : <LoginPage />} />
          <Route path="/register" element={isAuth ? <HomePage/> : <RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-history" element={<OrderPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/vendor" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
