import React, { Component } from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import LoginComponent from "./Login"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../store"

test("renders login form with email and password fields", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    </BrowserRouter>,
  )
  const emailInput = screen.getByLabelText(/Email address/i)
  const passwordInput = screen.getByLabelText(/Password/i)
  const signInButton = screen.getByRole("button", { name: /Sign in/i })

  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(signInButton).toBeInTheDocument()
})

test("displays error message when email is not provided", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    </BrowserRouter>,
  )
  const signInButton = screen.getByRole("button", { name: /Sign in/i })
  fireEvent.click(signInButton);
  const emailErrorMessage = screen.getByText(/Email cannot be empty/i)
  expect(emailErrorMessage).toBeInTheDocument()
})

test("displays error message when email is invalid", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    </BrowserRouter>,
  )
  const emailInput = screen.getByLabelText(/Email address/i)
  fireEvent.change(emailInput, { target: { value: "invalidemail" } })
  const signInButton = screen.getByRole("button", { name: /Sign in/i })
  fireEvent.click(signInButton)

  const emailErrorMessage = screen.getByText(/Email is not valid/i)
  expect(emailErrorMessage).toBeInTheDocument()
})

test("displays error message when password is not provided", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    </BrowserRouter>,
  )
  const emailInput = screen.getByLabelText(/Email address/i)
  fireEvent.change(emailInput, { target: { value: "test@test.com" } })
  const signInButton = screen.getByRole("button", { name: /Sign in/i })
  fireEvent.click(signInButton)

  const passwordErrorMessage = screen.getByText(/Password cannot be empty/i)
  expect(passwordErrorMessage).toBeInTheDocument()
})

test("displays error message when password is less than 8 characters", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    </BrowserRouter>,
  )
  const emailInput = screen.getByLabelText(/Email address/i)
  const passwordInput = screen.getByLabelText(/Password/i)
  fireEvent.change(emailInput, { target: { value: "test@test.com" } })
  fireEvent.change(passwordInput, { target: { value: "123" } })

  const signInButton = screen.getByRole("button", { name: /Sign in/i })
  fireEvent.click(signInButton)

  const passwordErrorMessage = screen.getByText(
    /Password must be at least 8 characters long/i,
  )
  expect(passwordErrorMessage).toBeInTheDocument()
})

test("submits the form when email and password are valid", () => {
  // Mock localStorage.getItem to return an array of users with a valid user
  const users = [{ email: "test@example.com", password: "password123" }]
  const localStorageMock = {
    getItem: vitest.fn().mockReturnValue(JSON.stringify(users)),
  }
  Object.defineProperty(window, "localStorage", { value: localStorageMock })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    </BrowserRouter>,
  )
  const emailInput = screen.getByLabelText(/Email address/i)
  const passwordInput = screen.getByLabelText(/Password/i)

  fireEvent.change(emailInput, { target: { value: "test@example.com" } })
  fireEvent.change(passwordInput, { target: { value: "password123" } })

  const signInButton = screen.getByRole("button", { name: /Sign in/i })
  fireEvent.click(signInButton)

  // Add assertions for successful form submission here
})
