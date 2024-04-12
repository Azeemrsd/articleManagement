import { Editor } from "@tinymce/tinymce-react"
import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { updateField, clearForm } from "../slices/signupSlice"

interface ArticleProps {
  id: string
  title: string
  content: string
  image: string
  date: string
  onEditClicked: (id: string) => void
  onDeleteClicked: (id: string) => void
}

export const Article: React.FC<ArticleProps> = ({
  title,
  id,
  content,
  image,
  date,
  onDeleteClicked,
  onEditClicked,
}) => {
  const [showModal, setShowModal] = useState(false)
  // Function to truncate title with ellipsis if it overflows
  const truncateTitle = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text
  }

  return (
    <>
      <div
        className="card"
        style={{ width: "18rem", maxHeight: "28rem", minHeight: "30rem" }}
      >
        <img
          className="card-img-top"
          width={180}
          height={250}
          src={image}
          alt="Card image cap"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{truncateTitle(title, 25)}</h5>{" "}
          {/* Truncate at 25 characters */}
          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
            }}
          ></p>{" "}
          <div className="card-footer text-muted">Posted on {date}</div>
          {/* Truncate content at 50 characters with ellipsis */}
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              see more
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onEditClicked(id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDeleteClicked(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className="card-img-top"
            width={180}
            height={350}
            src={image}
            alt="Card image cap"
          />
          <p
            id="modal-content"
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></p>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false)
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
