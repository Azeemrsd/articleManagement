import React from "react"
import { render, fireEvent, waitFor, getAllByText, screen } from "@testing-library/react"
import ArticleFormModal from "./ArticleFormModal"
import { Provider } from "react-redux"
import { store } from "../store"

describe("ArticleFormModal Component", () => {
  it("renders properly", () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <ArticleFormModal showModal={true} handleCloseModal={() => {}} />
      </Provider>,
    )

    expect(getByText("Add Article")).toBeInTheDocument()
    expect(getByLabelText("Title")).toBeInTheDocument()
    expect(getByLabelText("Article content")).toBeInTheDocument()
    expect(getByLabelText("Choose file")).toBeInTheDocument()
    expect(getByText("Close")).toBeInTheDocument()
    expect(getByText("Save changes")).toBeInTheDocument()
  })

  it("displays error messages when submitting with empty fields", async () => {
    const handleCloseModal = vitest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <ArticleFormModal
          showModal={true}
          handleCloseModal={handleCloseModal}
        />
      </Provider>,
    )

    fireEvent.click(getByText("Save changes"))
    await waitFor(() => {
      expect(getByText("Title cannot be empty")).toBeInTheDocument()
      const fullContent = screen.getAllByText((content, node) => {
        const articleContent = node!.querySelector(".text-danger")?.textContent;
        return articleContent && articleContent.includes("Content cannot be empty");
      });
      console.log("🚀 ~ fullContent ~ fullContent:", fullContent)
      expect(fullContent.length).toBeGreaterThan(0)
      expect(getByText("Please select an image")).toBeInTheDocument()
    })
  })
})
