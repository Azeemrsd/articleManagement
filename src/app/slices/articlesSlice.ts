import { Middleware, PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"
import { RootState } from "../store"

export interface Article {
  id: string
  title: string
  imageBase: string
  content: string
  date: string
 
}

const initialState: Article[] = []

export const articleSlice = createAppSlice({
  name: "articles",
  initialState,
  reducers: create => ({
    setArticle: create.reducer(
      (
        state,
        action: PayloadAction<Article>,
      ) => [action.payload, ...state]
      ,
    ),
    deleteArticle: create.reducer((state, action: PayloadAction<string>) => {
        const indexToBeRemoved = state.findIndex(article => article.id === action.payload);
        state.splice(indexToBeRemoved, 1);
    }),
    updateArticle: create.reducer((state, action: PayloadAction<Article>) => {
        const indexToBeUpdated = state.findIndex(article => article.id === action.payload.id);
        state[indexToBeUpdated] = action.payload
    })
   
  }),

  
})

export const { setArticle, deleteArticle, updateArticle } = articleSlice.actions;


export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('articles');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  export const saveState = (state: Article[]) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('articles', serializedState);
    } catch {
      // Ignore writing errors
    }
  };

  export const localStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    const result = next(action);
    saveState(store.getState().articles);
    return result;
  };