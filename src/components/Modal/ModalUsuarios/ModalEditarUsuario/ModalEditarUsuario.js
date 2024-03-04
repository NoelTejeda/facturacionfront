import React, { useState } from "react"
import { Modal, Row, Col, Button, Container } from "react-bootstrap"
import axios from "axios"
import moment from 'moment'
import { urlstandart } from "../../../../utils/url"
import { getToken, decodeToken } from "../../../../utils/token"
import { toast } from "react-toastify"
import "./ModalEditarUsuario.scss"

const url = `${urlstandart}/api/v1/usuarios/editar`

export default function Usuarios(props) {
  const { show, setShow, title, datos} = props
  const [rolesArray, setRolesArray] = useState(["admin"])
  const [botonHabilitado, setBotonHabilitado] = useState(true)
  const [datosUpdate, setDatosUpdate] = useState({})

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const onClose = () => {
    setShow(false)
    setBotonHabilitado(false)
    setDatosUpdate({})
  }

  const handleInputRoles = (event) => {
    setRolesArray([event.target.value])
  }

  const handleInputChange = (event) => {
    setDatosUpdate({
      ...datosUpdate,
      nombreUsuario: datos.nombreUsuario,
      nombre: datos.nombre,
      email: datos.email,
      [event.target.name]: event.target.value,
      roles: rolesArray,
      created_at: moment(Date.now()).format("YYYY-MM-DD"),
      status: true
    },
    console.debug(datosUpdate))
  }

  const validationEquals = (e) => {
    if (e.target.value === datosUpdate.password) {
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

  function editUsuario() {
    if(!datosUpdate.roles){
      toast(`Debe Llenar el Rol`, options2)
      setShow(false)
      setDatosUpdate({})
    } else {
      axios
        .post(url, datosUpdate,  {headers: {'Authorization': `Bearer ${token}`, userName: nombreUsuario }})
        .then((response) => {
          toast("Usuario Editado Correctamente", options)
          setShow(false)
          setBotonHabilitado(false)
          setDatosUpdate({})
        },(error) => {
          console.debug(error)
          toast("Error en la Edicion del Usuario", options2)
          setShow(false)
          setBotonHabilitado(false)
          setDatosUpdate({})
        })
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
                value={datos.nombre}
                readOnly
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
                value={datos.nombreUsuario}
                readOnly
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
                value={datos.email}
                readOnly
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
                  aria-label="Seleccione un Rol"
                  id="roles"
                  onChange={handleInputRoles}
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
                id="password"
                onChange={handleInputChange}
                placeholder="Cambiar su Contraseña"
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
                id="password2"
                onChange={validationEquals}
                placeholder="Repita su Contraseña"
                required
              />
            </Col>
          </Row>
          {!datos.status ?
            <Row>
              <Col xs={12} md={12}>
                <label
                    for="observacion"
                    className="badge label-turquesa text-wrap badge-label"
                >
                    Motivo de DesBloqueo
                </label>
                <textarea id="observacion" name="observacion" className="form-control" placeholder="Motivo de Desbloqueo" onChange={handleInputChange} />
                </Col>
            </Row>
          : 
            ''
          }
        </Modal.Body>

        <Modal.Footer>
          <Row>
            <Col>
              <Button variant="outline-secondary" onClick={onClose}>
                Cancelar
              </Button>
            </Col>
            <Col>
              {botonHabilitado ? 
                <Button
                  className="boton-turquesa"
                  type="submit"
                  onClick={editUsuario}
                >
                  Guardar
                </Button>
              :
                <Button
                  className="boton-turquesa"
                  type="submit"
                  disabled
                >
                  Guardar
                </Button>}
            </Col>
          </Row>
        </Modal.Footer>
       
      </Modal>
    </Container>
  )
}