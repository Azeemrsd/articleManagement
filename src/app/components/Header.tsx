import { Button } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { useAppDispatch, useAppSelector } from "../hooks"
import { logoutUser } from "../slices/authSlice";

function Header() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth)
    const logout = () => {
        dispatch(logoutUser());
    }
  return (
    <Navbar className="bg-body-tertiary bg-dark">
      <Container>
        <Navbar.Brand href="#home">Article Management System</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="d-flex gap-2 ">
            <Navbar.Text>
              Signed in as: <a href="#login">{auth.firstName + " " + auth.lastName}</a>
            </Navbar.Text>
            <Button variant="light" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
