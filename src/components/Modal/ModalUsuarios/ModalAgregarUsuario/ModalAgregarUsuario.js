import React, { useState } from "react"
import { Modal, Row, Col, Button, Container } from "react-bootstrap"
import axios from "axios"
import moment from 'moment'
import { urllogin } from "../../../../utils/url"
import { toast } from "react-toastify"
import { getToken, decodeToken } from "../../../../utils/token"
import "./ModalAgregarUsuario.scss"

const url = `${urllogin}/nuevo`

export default function Usuarios(props) {
  const { show, setShow, title } = props
  const [datos, setDatos] = useState()
  const [rolesArray, setRolesArray] = useState([])
  const [botonHabilitado, setBotonHabilitado] = useState(false)

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const onClose = () => {
    setShow(false)
    setBotonHabilitado(false)
  }

  const handleInputRoles = (event) => {
    setRolesArray([event.target.value])
  }

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
      roles: rolesArray,
      created_at: moment(Date.now()).format("YYYY-MM-DD"),
      status: true
    },console.debug(datos))
  }

  const validationEquals = (e) => {
    if (e.target.value === datos.password) {
      setBotonHabilitado(true)
    } else {
      setBotonHabilitado(false)
    }
  }

  const options = {
    autoClose: 3000,
    type: toast.TYPE.SUCCESS,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT
  }
  
  const options2 = {
    autoClose: 3000,
    type: toast.TYPE.ERROR,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT
  }

  function createUsuario() {
    if(datos !== ""){
      axios
        .post(url, datos,  {headers: {'Authorization': `Bearer ${token}`, userName: nombreUsuario }})
        .then((response) => {
          console.debug(response.status)
          toast("Usuario Registrado Correctamente", options)
          setDatos()
          setShow(false)
          setBotonHabilitado(false)
        },(error) => {
            console.debug(error)
            toast("Error al Cargar Usuario", options2)
            setDatos()
            setShow(false)
            setBotonHabilitado(false)
        })
      }else{
        toast("Debe Llenar todos los campos", options2)
        console.debug("Datos Vacios")
      }
  }
  return (
    <Container fluid>
      <Modal
        size="md"
        show={show}
        onHide={() => {
          setShow(false)
          setBotonHabilitado(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
          <Row>
            <Col xs={12} md={6}>
              <label
                for="nombre"
                className="badge label-turquesa text-wrap badge-label"
              >
                Nombre y Apellido *
              </label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                placeholder="Nombre y Apellido"
                maxLength={25}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={12} md={6}>
              <label
                for="apellido"
                className="badge label-turquesa text-wrap badge-label"
              >
                Nombre de Usuario *
              </label>
              <input
                className="form-control"
                type="text"
                name="nombreUsuario"
                placeholder="Nombre de Usuario"
                maxLength={10}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <label
                for="email"
                className="badge label-turquesa text-wrap badge-label"
              >
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                /* pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/" */
                pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
                maxLength={30}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={12} md={6}>
              <label
                for="rol"
                className="badge label-turquesa text-wrap badge-label"
              >
                Rol *
              </label>
              <div className="input-group">
                <select
                  className="form-select form-control"
                  name="roles"
                  onChange={handleInputRoles}
                  aria-label="Seleccione un Rol"
                  id="roles"
                  required
                >
                  <option value="cobe">Seleccione un Rol</option>
                  <option value="admin">Administrador</option>
                  <option value="gerente">Gerente</option>
                  <option value="factc">Coordinador de Facturacion</option>
                  <option value="facte">Especialista de Facturacion</option>
                  <option value="cobc">Coordinador de Cobranzas</option>
                  <option value="cobe">Especialista de Cobranzas</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="aprobadorfc">AprobadorFC</option>
                  <option value="enrutador">Enrutador</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <label
                for="password"
                className="badge label-turquesa text-wrap badge-label"
              >
                Contraseña *
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Escriba su Contraseña"
                maxLength={20}
                required
                />
            </Col>
            <Col xs={12} md={6}>
              <label
                for="password"
                className="badge label-turquesa text-wrap badge-label"
                >
                Repetir Contraseña *
              </label>
              <input
                className="form-control"
                type="password"
                name="pasword2"
                onChange={validationEquals}
                placeholder="Repita su Contraseña"
                maxLength={20}
                required
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Row>
            <Col>
              <Button variant="outline-secondary" onClick={onClose}>
                Cancelar
              </Button>
            </Col>
            <Col>
              {botonHabilitado ? (
                <Button
                  className="boton-turquesa"
                  type="submit"
                  onClick={createUsuario}
                >
                  Guardar
                </Button>
              ) : (
                <Button variant="outline-secondary" type="submit" disabled>
                  Guardar
                </Button>
              )}
            </Col>
          </Row>
        </Modal.Footer>
       
      </Modal>
    </Container>
  )
}
