import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"
import "./App.css"
import LoginComponent from "./app/components/Login"
import Header from "./app/components/Header"
import Home from "./app/components/Home"
import Registration from "./app/components/Registration"
import { useAppSelector } from "./app/hooks"
import { useEffect } from "react"

export const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}
const App = () => {
  const auth = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.email) navigate("/")
  }, [auth.email])


  return (
    <>
      {auth.email && <Header />}
      <div className={"container" + !auth.email ? "content" : ""}>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/"
            element={auth.email ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} /> {/* 404 route */}
        </Routes>
      </div>
    </>
  )
}

export default App
