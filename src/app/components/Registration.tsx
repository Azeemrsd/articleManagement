import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setUser } from "../slices/authSlice";
import { validateEmail } from "../../utils/validation.utls";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Errors {
  [key: string]: string;
}

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  useEffect(() => {
    if(isSubmitted)
        validateForm();
  }, [isSubmitted, formData.firstName, formData.lastName, formData.email, formData.password]);

  function validateForm() {
    const { firstName, lastName, email, password } = formData;
    const errorMessages: Errors = {};

    if (!firstName) {
        errorMessages.firstName = "First name is required";
    }

    if (!lastName) {
        errorMessages.lastName = "Last name is required";
    }

    if (!email) {
        errorMessages.email = "Email is required";
    } else if (!validateEmail(email)) {
        errorMessages.email = "Email is not valid";
    }
    if (!password) {
        errorMessages.password = "Password is required";
    } else if (password.length < 8) {
        errorMessages.password = "Password must be at least 8 characters long";
    }

    setErrors(errorMessages);
    return errorMessages;
}

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    const errorMessages: Errors = validateForm();

    if (Object.values(errorMessages).every((errorMessage) => errorMessage === "")) {
      const userId = Math.random().toString();
      const newUser = { userId, ...formData };
      const users = JSON.parse(localStorage.getItem("users") || "[]") as FormData[];
      const isUserAlreadyExist =  users.find(user => user.email === newUser.email);
      if (isUserAlreadyExist) {
        alert("User already exist, please login")
        return
      }
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      dispatch(setUser(newUser));
      navigate("/");
    }
  }, [formData, navigate, dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Welcome, please sign up here</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                id="firstName"
                required
              />
              <small className="text-danger form-text">{errors.firstName}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                id="lastName"
                required
              />
              <small className="form-text text-danger">{errors.lastName}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address (Username) *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                required
              />
              <small className="form-text text-danger">{errors.email}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                required
              />
              <small className="form-text text-danger">{errors.password}</small>
            </div>
            <div className="mb-3 d-flex align-items-center gap-2">
              <span>Already have an account?</span>
              <button onClick={() => navigate("/login")} className="btn p-0 btn-link">
                Login
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;

