import { useState } from "react"
import { ArticleList } from "./ArticleList"
import ArticleFormModal from "./ArticleFormModal"
import { useAppDispatch, useAppSelector } from "../hooks"
import { setFormDetails } from "../slices/articleFormSlice"
import { deleteArticle } from "../slices/articlesSlice"

const Home = () => {
  const dispatch = useAppDispatch()
  const articles = useAppSelector(state => state.articles)
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleArticleDelete = (id: string) => {
    const articleToDelete = articles.find(article => article.id === id)
    if (articleToDelete) dispatch(deleteArticle(articleToDelete.id))
  }
  const handleArticleEdit = (id: string) => {
    const articleToEdit = articles.find(article => article.id === id)
    if (articleToEdit) {
      dispatch(setFormDetails(articleToEdit))
      setShowModal(true)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-end mt-2">
          <button className="btn btn-primary" onClick={handleShowModal}>
            Add Article
          </button>
        </div>
      </div>
      <ArticleList
        onDeleteClicked={handleArticleDelete}
        onEditClicked={handleArticleEdit}
      />
      <ArticleFormModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}
export default Home;
