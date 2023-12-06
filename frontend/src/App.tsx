import { GuestLayout } from "./Layouts"
import { Login } from "./components"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


const App = () => {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/login" element={<GuestLayout>
              {<Login />}
            </GuestLayout>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
