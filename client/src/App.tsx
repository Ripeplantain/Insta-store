// import { PrivateRoute, PublicRoute } from "./components/ProtectedRoute"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginPage, RegisterPage, HomePage } from "./pages"




const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
