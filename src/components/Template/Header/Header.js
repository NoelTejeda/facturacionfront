import React from "react"
import { Link } from "react-router-dom"
import { Button} from "semantic-ui-react"
//import ImagenDefault from "../../../assets/avatar_default/avatar.png"
import useAuth from "../../../hooks/useAuth"
import "./Header.scss"

export default function HeaderTemplate() {
  const auth = useAuth()
  //const history = useHistory()
  const { logout } = useAuth()

  const nombre = auth.auth.nombre

  const onLogout = () => {
    logout()
  }
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="/">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </li>
        </ul>

        {/* SEARCH FORM 
                <form className="form-inline ml-3">
                    <div className="input-group">
                        <input className="form-control form-control-navbar" type="search" placeholder="Buscar" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </form>
*/}
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mb-1">
            <Link
              to="/"
              className="nav-link"
              data-slide="true"
              onClick={onLogout}
            >
              <Button title={nombre}>Cerrar Sesion</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
