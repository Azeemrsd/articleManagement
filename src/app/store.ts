import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
// import { signupSlice } from "./slices/signupSlice"
import { articleFormSlice } from "./slices/articleFormSlice"
import { articleSlice, loadState, localStorageMiddleware } from "./slices/articlesSlice"
import { authLocalStorageMiddleware, authSlice, loadAuthState } from "./slices/authSlice"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.articleSlice, article
const rootReducer = combineSlices(articleFormSlice, articleSlice, authSlice)
// Infer the `RootState` type from the root reducersignupSlice, combineRed
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config

const persistedState = loadState();
const persistedAuthState = loadAuthState();
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(localStorageMiddleware, authLocalStorageMiddleware)
    },
    preloadedState: {
      ...preloadedState,
      articles: persistedState,
      auth: persistedAuthState
    },
  })
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
