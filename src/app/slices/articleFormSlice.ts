import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"

export interface ArticleForm {
  id: string
  title: string
  imageUrl: string
  imageBase: string
  content: string
  date: string
  errors: {
    title: string
    image: string
    content: string
  }
}

const initialState: ArticleForm = {
  id: "",
  title: "",
  imageUrl: "",
  imageBase: "",
  content: "",
  date: "",
  errors: {
    title: "",
    image: "",
    content: "",
  },
}

export const articleFormSlice = createAppSlice({
  name: "articleForm",
  initialState,
  reducers: create => ({
    updateField: create.reducer(
      (
        state,
        action: PayloadAction<{
          field: keyof Omit<ArticleForm, "errors">
          value: string
        }>,
      ) => {
        const { field, value } = action.payload
        state[field] = value
      },
    ),
    setErrors: create.reducer(
      (
        state,
        action: PayloadAction<{
          field: keyof ArticleForm["errors"]
          value: string
        }>,
      ) => {
        const { field, value } = action.payload
        state["errors"][field] = value
      },
    ),
    updateAllErrors: create.reducer(
      (
        state,
        action: PayloadAction<
          { field: keyof ArticleForm["errors"]; value: string }[]
        >,
      ) => {
        state["errors"] = {
          title: "",
          image: "",
          content: "",
        }
        action.payload.forEach(error => {
          state["errors"][error.field] = error.value
        })
      },
    ),
    setFormDetails: create.reducer(
      (
        state,
        action: PayloadAction<Omit<ArticleForm, "errors" | "imageUrl">>,
      ) => {
        state.content = action.payload.content
        state.title = action.payload.title
        state.id = action.payload.id
        state.imageUrl = `data:image/jpeg;base64,${action.payload.imageBase}`
        state.imageBase = action.payload.imageBase
        state.date = action.payload.date
      },
    ),
    clearErrors: create.reducer(state => {
      state.errors.content = ""
      state.errors.image = ""
      state.errors.title = ""
    }),
    clearForm: create.reducer(state => {
      state.id = ""
      state.title = ""
      state.content = ""
      state.imageBase = ""
      state.imageUrl = ""
      state.date = ""
    }),
  }),
  selectors: {
    hasErrors: state =>
      state.errors.content || state.errors.image || state.errors.title,
  },
})

export const {
  updateField,
  clearForm,
  setFormDetails,
  setErrors,
  clearErrors,
  updateAllErrors,
} = articleFormSlice.actions
export const { hasErrors } = articleFormSlice.selectors
