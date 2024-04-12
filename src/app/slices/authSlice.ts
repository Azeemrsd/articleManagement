import { Middleware, PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"
import { RootState } from "../store"

interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  password: string
}

const initialState: User = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action: PayloadAction<User>) => {
      return {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
      }
    }),
    logoutUser: create.reducer(() =>initialState),
  }),
})

export const { setUser, logoutUser } = authSlice.actions

export const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem("currentUser")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveAuthState = (state: User) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("currentUser", serializedState)
  } catch {
    // Ignore writing errors
  }
}

export const authLocalStorageMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    const result = next(action)
    saveAuthState(store.getState().auth)
    return result
  }
