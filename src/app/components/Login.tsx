import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks"
import { setUser } from "../slices/authSlice"
import { validateEmail } from "../../utils/validation.utils"

const LoginComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigateToRegistration = () => {
    navigate("/register")
  }

  useEffect(() => {
    if (isSubmitted) {
      if (!email) {
        setEmailErrorMessage("Email cannot be empty")
      } else setEmailErrorMessage("")
      if (!validateEmail(email)) {
        setEmailErrorMessage("Email is not valid")
      } else setEmailErrorMessage("")
      if (!password) {
        setPasswordErrorMessage("Password cannot be empty")
        return
      } else setPasswordErrorMessage("")
      if (password.length < 8) {
        setPasswordErrorMessage("Password must be at least 8 characters long")
      } else setPasswordErrorMessage("")
    }
  }, [email, password])

  const handleLogin = () => {
    setIsSubmitted(true)
    if (!email) {
      setEmailErrorMessage("Email cannot be empty");
    } else if (!validateEmail(email)) {
      setEmailErrorMessage("Email is not valid")
    }
    if (!password) {
      setPasswordErrorMessage("Password cannot be empty")
      return
    } else if (password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters long")
      return
    }

    const users = JSON.parse(localStorage.getItem("users") ?? "[]")
    const userTryingToLogin = users.find(
      user => user.email === email && user.password === password,
    )
    if (userTryingToLogin) {
      dispatch(setUser(userTryingToLogin))
      navigate("/")
    } else {
      alert("Invalid credentials")
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Please sign in</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${!emailErrorMessage ? "" : "is-invalid"}`}
                defaultValue={email}
                id="email"
                onChange={event => setEmail(event.target.value)}
                aria-describedby="emailHelp"
              />
              <small>
                {emailErrorMessage && (
                  <div className="form-text text-danger">
                    {emailErrorMessage}
                  </div>
                )}
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                defaultValue={password}
                onChange={event => setPassword(event.target.value)}
                className={`form-control ${!passwordErrorMessage ? "" : "is-invalid"}`}
                id="password"
              />
              <small>
                {passwordErrorMessage && (
                  <div className="form-text text-danger">
                    {passwordErrorMessage}
                  </div>
                )}
              </small>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember me
              </label>
            </div>
            <div className="mb-3 d-flex align-items-center gap-2">
              <span>Don't have an account?</span>
              <button
                type="button"
                onClick={navigateToRegistration}
                className="btn p-0 btn-link"
              >
                Sign Up
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
