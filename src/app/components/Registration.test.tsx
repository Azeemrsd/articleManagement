import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import Registration from "./Registration"
import { Provider } from "react-redux"
import { store } from "../store"
import { BrowserRouter } from "react-router-dom"

test("renders registration form with all fields", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  const emailInput = screen.getByLabelText(/Email address \(Username\)/i)
  const passwordInput = screen.getByLabelText(/Password/i)
  const signUpButton = screen.getByRole("button", { name: /Sign up/i })

  expect(firstNameInput).toBeInTheDocument()
  expect(lastNameInput).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(signUpButton).toBeInTheDocument()
})

test("displays error message when first name is not provided", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const signUpButton = screen.getByRole("button", { name: /Sign up/i })
  fireEvent.click(signUpButton)

  const firstNameErrorMessage = screen.getByText(/First name is required/i)
  expect(firstNameErrorMessage).toBeInTheDocument()
})

test("displays error message when last name is not provided", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const signUpButton = screen.getByRole("button", { name: /Sign up/i })
  fireEvent.click(signUpButton)

  const lastNameErrorMessage = screen.getByText(/Last name is required/i)
  expect(lastNameErrorMessage).toBeInTheDocument()
})

test("displays error message when email is not provided", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const signUpButton = screen.getByRole("button", { name: /Sign up/i })
  fireEvent.click(signUpButton)

  const emailErrorMessage = screen.getByText(/Email is required/i)
  expect(emailErrorMessage).toBeInTheDocument()
})

test("displays error message when email is invalid", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const emailInput = screen.getByLabelText(/Email address \(Username\)/i)
  fireEvent.change(emailInput, { target: { value: "invalidemail" } })

  const signUpButton = screen.getByRole("button", { name: /Sign up/i })
  fireEvent.click(signUpButton)

  const emailErrorMessage = screen.getByText(/Email is not valid/i)
  expect(emailErrorMessage).toBeInTheDocument()
})

test("displays error message when password is not provided", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const signUpButton = screen.getByRole("button", { name: /Sign up/i })
  fireEvent.click(signUpButton)

  const passwordErrorMessage = screen.getByText(/Password is required/i)
  expect(passwordErrorMessage).toBeInTheDocument()
})

test("displays error message when password is less than 8 characters", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const passwordInput = screen.getByLabelText(/Password/i)
  fireEvent.change(passwordInput, { target: { value: "123" } })

  const signUpButton = screen.getByRole("button", { name: /Sign up/i })
  fireEvent.click(signUpButton)

  const passwordErrorMessage = screen.getByText(
    /Password must be at least 8 characters long/i,
  )
  expect(passwordErrorMessage).toBeInTheDocument()
})

test("submits the form when all fields are valid", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>,
  )
  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  const emailInput = screen.getByLabelText(/Email address \(Username\)/i)
  const passwordInput = screen.getByLabelText(/Password/i)
  const signUpButton = screen.getByRole("button", { name: /Sign up/i })

  fireEvent.change(firstNameInput, { target: { value: "John" } })
  fireEvent.change(lastNameInput, { target: { value: "Doe" } })
  fireEvent.change(emailInput, { target: { value: "john@example.com" } })
  fireEvent.change(passwordInput, { target: { value: "password123" } })

  fireEvent.click(signUpButton)

  // Add assertions for successful form submission here
})
