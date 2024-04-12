import { Editor } from "@tinymce/tinymce-react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { Modal, Button, Toast } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks"
import {
    ArticleForm,
    clearErrors,
  clearForm,
  hasErrors,
  setErrors,
  updateAllErrors,
  updateField,
} from "../slices/articleFormSlice"
import { setArticle, updateArticle } from "../slices/articlesSlice"

interface ArticleFormModalProps {
  showModal: boolean
  handleCloseModal: () => void
}

const ArticleFormModal: React.FC<ArticleFormModalProps> = ({
  showModal,
  handleCloseModal,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useAppDispatch()
  const articleState = useAppSelector(state => state.articleForm)
  const { imageUrl, imageBase, id, title, date, content, errors } = articleState

  useEffect(() => {
    if (!isSubmitted) return
    const errors: {field: keyof ArticleForm["errors"]; value: string }[] = [];
    if (!title) errors.push({ field: "title", value: "Title cannot be empty" });
    if (!content) errors.push({ field: "content", value: "Content cannot be empty" });
    if (!imageBase) errors.push({ field: "image", value: "Please select an image" });
    dispatch(updateAllErrors(errors));
  }, [isSubmitted, title, content, imageBase, dispatch]);
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSize = 4 * 1024 * 1024; // 4 MB in bytes
  
    if (file && file.size <= maxSize) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const imageBase = reader.result?.toString().split(",")[1] || "";
        dispatch(updateField({ field: "imageUrl", value: imageUrl }));
        dispatch(updateField({ field: "imageBase", value: imageBase }));
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(updateField({ field: "imageUrl", value: "" }));
      dispatch(updateField({ field: "imageBase", value: "" }));
      dispatch(setErrors({ field: "image", value: "File size exceeds the limit of 4MB." }));
      event.target.value = ""; // Reset the file input
    }
  };
  
  const handleArticleSubmit = () => {
    setIsSubmitted(true);
  
    if (title && content && imageBase) {
      if (id) {
        dispatch(updateArticle({ id, date, title, content, imageBase }));
      } else {
        const articleId = (Math.floor(Math.random() * 90000) + 10000).toString();
        const date = new Date().toLocaleDateString();
        dispatch(setArticle({ id: articleId, date, title, content, imageBase }));
      }
  
      dispatch(clearErrors());
      dispatch(clearForm());
      handleCloseModal();
    } else {
      const errors: {field: keyof ArticleForm["errors"]; value: string }[] = [];
      if (!title) errors.push({ field: "title", value: "Title cannot be empty" });
      if (!content) errors.push({ field: "content", value: "Content cannot be empty" });
      if (!imageBase) errors.push({ field: "image", value: "Please select an image" });
      dispatch(updateAllErrors(errors));
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            defaultValue={title}
            onChange={event =>
              dispatch(
                updateField({ field: "title", value: event.target.value }),
              )
            }
            placeholder="Article title"
            name="title"
            id="title"
          />
          <small className="text-danger">{errors?.title && errors.title}</small>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Article content
          </label>
          <Editor
            id="content"
            apiKey="zoo6dr0vdh7l39yne68v77s6j4ai529llxerlmo91oqec89s"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
            }}
            value={content}
            onEditorChange={value =>
              dispatch(updateField({ field: "content", value }))
            }
          />
          <small className="text-danger">
            {errors?.content && errors.content}
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Choose file
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
            id="fileInput"
            placeholder=""
            aria-describedby="fileHelpId"
          />
          <div id="fileHelpId" className="form-text">
            Max Size 4MB
          </div>
          <small className="text-danger">
            {errors?.image && errors.image}
          </small>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch(clearForm())
            handleCloseModal()
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleArticleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ArticleFormModal
