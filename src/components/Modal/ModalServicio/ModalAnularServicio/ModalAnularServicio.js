import React from "react"
import { Modal, Row, Col, Button } from "react-bootstrap"
import { getToken, decodeToken } from "../../../../utils/token"
import { toast } from "react-toastify"
import moment from "moment"
import axios from "axios"
import { urlstandart } from "../../../../utils/url"
import "./ModalAnularServicio.scss"

const url = `${urlstandart}/api/v1/servicio/update`

export default function ModalAnularServicio(props) {
  const { showModalAnular, setShowModalAnular, title, idp, datos } = props

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const onClose = () => {
    setShowModalAnular(false)
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

  function updatePost() {
    try {
      axios
        .post(
          url,
          {...datos,
            fecha_creacion: moment(Date.now()).format("DD-MM-YYYY"),
            status: false,
            usuario: nombreUsuario },
          { headers: { Authorization: "Bearer " + token , userName: nombreUsuario } }
        )
        .then(
          (response) => {
            toast("Servicio Anulado Correctamente", options)
            setShowModalAnular(false)
            console.debug(response)
          },
          (error) => {
            toast("Error al Anular el Servicio", options2)
            setShowModalAnular(false)
            console.debug(datos)
            console.debug(error)
          }
        )
    } catch (error) {
      console.debug(error)
    }
  }

  return (
    <Modal
      show={showModalAnular}
      onHide={() => setShowModalAnular(false)}
      idp={idp}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>
          Seguro desea <b className="text-danger">{title}</b> {datos.descripcion}
        </h2>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col>
            <Button variant="outline-secondary" onClick={() => onClose()}>
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              className="boton-turquesa"
              type="submit"
              onClick={() => updatePost()}
            >
              Aceptar
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}
