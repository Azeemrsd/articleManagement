import { useAppSelector } from "../hooks"
import { Article } from "./Article"

export const ArticleList: React.FC<{
  onDeleteClicked: (id: string) => void
  onEditClicked: (id: string) => void
}> = ({ onDeleteClicked, onEditClicked }) => {
  function base64ToUrl(base64String: string) {
    return `data:image/jpeg;base64,${base64String}`
  }
  const articles = useAppSelector(state => state.articles)

  return (
    <div className="content">
      <div className="mt-5 d-flex justify-content-start align-items-center gap-3 flex-wrap">
        {articles.length ? (
          articles.map(article => (
            <Article
              key={article.id}
              title={article.title}
              content={article.content}
              id={article.id}
              date={article.date}
              image={base64ToUrl(article.imageBase)}
              onDeleteClicked={onDeleteClicked}
              onEditClicked={onEditClicked}
            />
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{height: "70vh"}}>
            <h4>No Articles yet</h4>
          </div>
        )}
      </div>
    </div>
  )
}
