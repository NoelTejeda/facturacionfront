import React from "react"
import { Modal, Row, Col, Button } from "react-bootstrap"
import { getToken, decodeToken } from "../../../../utils/token"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../../utils/toastconfig"
import axios from "axios"
import { urlstandart } from "../../../../utils/url"
import "./ModalAnularOperador.scss"

const url = `${urlstandart}/api/v1/operador`

export default function ModalAnularOperador(props) {
  const { showModalAnular, setShowModalAnular, title, idp, datosM } = props

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const onClose = () => {
    setShowModalAnular(false)
  }

  function updatePost() {
    try {
      axios
        .post(
          url,
          {
            id: datosM.id,
            direccion: datosM.direccion,
            fecha_registro: datosM.fecha_registro,
            hora_registro: datosM.hora_registro,
            operador: datosM.operador,
            rif: datosM.rif,
            telefono: datosM.telefono,
            usuario: nombreUsuario,
            status: false
          },
          { headers: { Authorization: "Bearer " + token ,  UserName: nombreUsuario } }
        )
        .then(
          (response) => {
            toast("Operador Anulado Correctamente", successtoast)
            setShowModalAnular(false)
            console.debug(response)
          },
          (error) => {
            toast("Error al Anular el Operador", errortoast)
            setShowModalAnular(false)
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
          Seguro desea <b className="text-danger">{title}</b> {datosM.operador}
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
