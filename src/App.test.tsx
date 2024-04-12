import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import App, { NotFound } from "./App"
import { store } from "./app/store"
import Registration from "./app/components/Registration"
import { setUser } from "./app/slices/authSlice"

test("renders login component when user is not authenticated", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  )
  const loginTitle = screen.getByText(/Please sign in/i)
  expect(loginTitle).toBeInTheDocument()
})

test("renders home component when user is authenticated", () => {
  // Mocking authentication state
  const mockAuthState = {
    auth: {
      email: "user@example.com", // Assuming the user is authenticated
    },
  }
  store.dispatch(
    setUser({
      email: "example@test.com",
      userId: "123",
      password: "password123",
      firstName: "firstName",
      lastName: "lastName",
    }),
  )
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    { initialState: mockAuthState },
  )

  const homeTitle = screen.getByText(/No Articles yet/i)
  expect(homeTitle).toBeInTheDocument()
})

test("redirects to login page when user is not authenticated and navigates to home", () => {
  const mockAuthState = {
    auth: {
      email: "",
    },
  }
  store.dispatch(
    setUser({
      email: "",
      firstName: " ",
      lastName: "",
      password: "",
      userId: "",
    }),
  )
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter initialEntries={["/"]}>
        <App />
      </BrowserRouter>
    </Provider>,
    { initialState: mockAuthState },
  )
  const loginTitle = screen.getByText(/Please sign in/i)
  expect(loginTitle).toBeInTheDocument()
})

test("redirects to home page when user is authenticated and navigates to login", () => {
  // Mocking authentication state
  const mockAuthState = {
    auth: {
      email: "user@example.com", // Assuming the user is authenticated
    },
  }
  store.dispatch(
    setUser({
      email: "user@example.com",
      firstName: "John ",
      lastName: "Doe",
      password: "12345678",
      userId: "2345678",
    }),
  )
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter initialEntries={["/login"]}>
        <App />
      </BrowserRouter>
    </Provider>,
    { initialState: mockAuthState },
  )
  const homeTitle = screen.getByText(/No Articles yet/i)
  expect(homeTitle).toBeInTheDocument()
})

test("renders not found component when navigating to non-existent route", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter initialEntries={["/abc"]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>,
  )

  const notFoundTitle = screen.getByText(/404 - Not Found/i)
  expect(notFoundTitle).toBeInTheDocument()
})
